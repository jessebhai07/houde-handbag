import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-3 text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      <p className="text-sm font-medium animate-pulse">Loading...</p>
    </div>
  );
}
