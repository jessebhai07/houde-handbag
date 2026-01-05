import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

// ✅ reuse same preset list (you can move this to a shared file if you want)
const PRESET_CATEGORIES = [
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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Optional safety:
// - If you only want to show ONE owner's products publicly,
//   set PUBLIC_OWNER_USER_ID in .env and it will filter by it.
// - Or pass ?userId=... in the URL.
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = (searchParams.get("userId") || "").trim();

    const filter = {};

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
      }
      filter.userId = userId;
    } else if (
      process.env.PUBLIC_OWNER_USER_ID &&
      mongoose.Types.ObjectId.isValid(process.env.PUBLIC_OWNER_USER_ID)
    ) {
      filter.userId = process.env.PUBLIC_OWNER_USER_ID;
    }
    // else: no filter => shows all products in DB

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();

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
