import jwt from "jsonwebtoken";

export async function getUserIdFromRequest(request) {
  // If your cookie name is different, change it here:
  const token = request.cookies?.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.userId || payload.id || null;
  } catch {
    return null;
  }
}
