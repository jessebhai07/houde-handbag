import { connectDB } from "@/lib/db";
import Timeline from "@/lib/models/timeline"; // Ensure path matches your file structure
import { requireUserId } from "@/lib/requireUser";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Auth Check
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authorized." }, 
        { status: 401 }
      );
    }

    // 2. Parse Body (FIXED: use req.json())
    const body = await req.json();
    const { eventDate, entitle, zntitle, zndescription, endescription } = body;

    // 3. Validation (Check all required fields)
    if (!eventDate || !entitle || !zntitle || !endescription || !zndescription) {
      return NextResponse.json(
        { error: "Missing required fields (eventDate, titles, or descriptions)." },
        { status: 400 }
      );
    }

    // 4. Connect DB
    await connectDB();

    // 5. Create Document (FIXED: Map fields correctly to Schema)
    // Ensure eventDate is a valid date string or object
    const newTimeline = await Timeline.create({
      eventDate: new Date(eventDate), 
      entitle,
      zntitle,
      zndescription,
      endescription,
    });

    // 6. Return Success (FIXED: Correct NextResponse syntax)
    return NextResponse.json(
      { 
        message: "Timeline created successfully.", 
        timeline: newTimeline 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Timeline Creation Error:", error);

    // 7. Handle Mongoose Validation Errors specifically
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(val => val.message);
        return NextResponse.json({ error: messages }, { status: 400 });
    }

    // 8. Generic Server Error (FIXED: Actually returning a response)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}