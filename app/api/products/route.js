import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { currentUser } from "@/lib/currentUser";
import { uploadFilesToCloudinary, slugifyFolderName } from "@/lib/upload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // prevents any weird caching behavior

export const PRESET_CATEGORIES = [
  "Back Pack",
  "Tool Bag",
  "Makeup Bag",
  "Tote Bag",
  "Insulated bag",
  "Waterproof Bag",
  "Game Case",
  "Laptop Bag",
  "Tablet cases",
  "Headphone Bag",
];

const norm = (s) => (s || "").toString().trim().toLowerCase();
const CATEGORY_MAP = new Map(PRESET_CATEGORIES.map((c) => [norm(c), c]));

export async function GET() {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const products = await Product.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { products, categories: PRESET_CATEGORIES },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const form = await request.formData();
    const categoryRaw = form.get("category");

    const pickedCategory = CATEGORY_MAP.get(norm(categoryRaw));
    if (!pickedCategory) {
      return NextResponse.json(
        { message: "Invalid category", allowedCategories: PRESET_CATEGORIES },
        { status: 400 }
      );
    }

    const all = form.getAll("images") || [];
    const files = all.filter(
      (f) => typeof f === "object" && f && "arrayBuffer" in f
    );

    if (files.length < 1) {
      return NextResponse.json(
        { message: "At least 1 image required" },
        { status: 400 }
      );
    }
    if (files.length > 10) {
      return NextResponse.json(
        { message: "Max 10 images per upload" },
        { status: 400 }
      );
    }

    // ✅ check how many already exist in this category
    const existing = await Product.findOne({
      userId: user.id,
      category: pickedCategory,
    })
      .select("images")
      .lean();

    const existingCount = existing?.images?.length || 0;
    const nextTotal = existingCount + files.length;

    // ✅ keep your original limit (10 total per category)
    if (nextTotal > 10) {
      return NextResponse.json(
        {
          message: `This category already has ${existingCount} images. You can upload only ${
            10 - existingCount
          } more.`,
        },
        { status: 400 }
      );
    }

    const folder = `products/${slugifyFolderName(pickedCategory)}`;
    const imageUrls = await uploadFilesToCloudinary(files, { folder });

    // ✅ upsert: create if missing, otherwise append images
    const product = await Product.findOneAndUpdate(
      { userId: user.id, category: pickedCategory },
      {
        $setOnInsert: { userId: user.id, category: pickedCategory },
        $push: { images: { $each: imageUrls } },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error("Upload Error:", e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
