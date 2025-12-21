import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { currentUser } from "@/lib/currentUser";

export const runtime = "nodejs";

export async function DELETE(request, context) {
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    // Next.js 15+ params can be Promise
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid product id" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const url = (body?.url || "").toString().trim();

    if (!url) {
      return NextResponse.json({ message: "Missing image url" }, { status: 400 });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: id, userId: user.id },
      { $pull: { images: url } },
      { new: true }
    ).lean();

    if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ product: updated }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
