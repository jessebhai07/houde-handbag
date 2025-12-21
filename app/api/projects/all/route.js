import { connectDB } from "@/lib/db";
import Projects from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const projects = await Projects.find({})
      .sort({ isPinned: -1, createdAt: -1 })
      .select("-userId");

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
