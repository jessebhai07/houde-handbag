import { connectDB } from "@/lib/db";
import Projects from "@/lib/models/Project";
import { requireUserId } from "@/lib/requireUser";
import { NextResponse } from "next/server";

// PATCH: Update a project
export async function PATCH(req, { params }) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json().catch(() => ({}));

    await connectDB();

    const updatedProject = await Projects.findOneAndUpdate(
      { _id: id, userId },
      {
        $set: {
          ...(body.title && { title: String(body.title).trim() }),
          ...(body.description && {
            description: String(body.description).trim(),
          }),
          ...(body.technologyStack && {
            technologyStack: body.technologyStack,
          }),
          ...(body.repo && { repo: String(body.repo).trim() }),
          ...(body.liveUrl && { liveUrl: String(body.liveUrl).trim() }),
          ...(body.features && { features: body.features }),
          ...(body.imageUrl && { imageUrl: String(body.imageUrl).trim() }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// DELETE: Remove a project
export async function DELETE(req, { params }) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const deletedProject = await Projects.findOneAndDelete({ _id: id, userId });

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
