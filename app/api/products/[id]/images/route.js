import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { currentUser } from "@/lib/currentUser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    // Next.js (newer) may make params a Promise
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const url = (searchParams.get("url") || "").trim();

    if (!url) {
      return NextResponse.json({ message: "Missing image url" }, { status: 400 });
    }

    // 1) check product exists for this user (better error than generic 404)
    const exists = await Product.exists({ _id: id, userId: user.id });
    if (!exists) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // 2) only update if that image url is actually inside the array
    const updated = await Product.findOneAndUpdate(
      { _id: id, userId: user.id, images: url },
      { $pull: { images: url } },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { message: "Image url not found in this product" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: updated }, { status: 200 });
  } catch (e) {
    console.error("Delete image error:", e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
