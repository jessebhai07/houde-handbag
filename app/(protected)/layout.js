import { redirect } from "next/navigation";
import { currentUser } from "@/lib/currentUser";

export default async function ProtectedLayout({ children }) {
  const user = await currentUser();

  if (!user) redirect("/login");

  return <>{children}</>;
}
