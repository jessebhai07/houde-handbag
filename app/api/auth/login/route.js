import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCookieName, signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    // const body = await req.json().catch(() => ({}));
    // const email = String(body.email || "")
    //   .trim()
    //   .toLowerCase();
    // const password = String(body.password || "");
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ fetch passwordHash even if select:false, and also fetch legacy password if it exists
    const user = await User.findOne({ email }).select(
      "name email passwordHash password"
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const hash = user.passwordHash || user.password; // ✅ support old data

    if (!hash) {
      // This is the reason for your crash (undefined hash)
      return NextResponse.json(
        {
          message:
            "Account password is missing. Re-register or reset password.",
        },
        { status: 500 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({ userId: user._id.toString() });

    const response = NextResponse.json({
      message: "User logged in successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set(getCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
