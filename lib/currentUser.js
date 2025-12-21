import "server-only";
import { cookies } from "next/headers";
import { decodeToken, getCookieName } from "./jwt";
import { connectDB } from "./db";
import User from "./models/User";

export async function currentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;

  if (!token) return null;

  try {
    const decode = decodeToken(token);
    await connectDB();

    const user = await User.findById(decode.userId).select("_id name email");

    return user
      ? { id: user._id.toString(), name: user.name, email: user.email }
      : null;
  } catch {
    return null;
  }
}
