import { connectDB } from "@/lib/db";
import Projects from "@/lib/models/Project";
import { requireUserId } from "@/lib/requireUser";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const projects = await Projects.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ projects });
}

export async function POST(req) {
  const userId = await requireUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  // ✅ DEFINE body
  const body = await req.json();

  const {
    title,
    description,
    technologyStack = [],
    repo = "",
    liveUrl = "",
    features = [],
    imageUrl = "",
    isPinned = false,
  } = body;

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  try {
    const newProject = await Projects.create({
      userId,
      title,
      description,
      technologyStack,
      repo,
      liveUrl,
      features,
      imageUrl,
      isPinned: !!isPinned, // ✅ use isPinned, not body.isPinned
    });

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
