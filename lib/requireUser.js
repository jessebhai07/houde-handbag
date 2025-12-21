import { cookies } from "next/headers";
import { getCookieName, verifyToken } from "./jwt";

export async function requireUserId() {
  const store = await cookies();
  const token = store.get(getCookieName())?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token);
    return payload?.userId || null;
  } catch {
    return null;
  }
}
