"use client";

import { BookCheck, Clipboard, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BottomBar() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        alert("User logged out");
        router.push("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-neutral-800 border-t border-neutral-700 md:hidden">
      <div className="flex justify-around items-center py-3 text-white">
        <Link href="/" className="flex flex-col items-center">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/displayTasks" className="flex flex-col items-center">
          <Clipboard size={24} />
          <span className="text-xs mt-1">Tasks</span>
        </Link>

        <button onClick={handleLogOut} className="flex flex-col items-center">
          <LogOut size={24} />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  );
}
