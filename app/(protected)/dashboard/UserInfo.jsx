"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import { Button } from "@/components/ui/button";

export default function UserInfo() {
  const router = useRouter();
  const { user, loading, refreshUser, setUser } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser?.(null);
      await refreshUser?.();
      router.refresh();
      router.replace("/login");
    } catch (e) {
      console.error(e);
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">Not signed in</div>;

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-background p-4">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold truncate">Dashboard</h1>
          <p className="text-sm text-muted-foreground truncate">
            {user.name} • {user.email}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
