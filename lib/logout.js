import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

// FIX: Add { session } here
export default function Logout({ session }) {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>

      {/* Now 'session' is defined from props */}
      {session?.user?.name && (
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
          {session.user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}