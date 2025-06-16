
import { BookCheck, Clipboard, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        alert("user logged out");
        router.push("/");
      } else {
        alert("logout failed");
      }
    } catch (error) {
      console.error("logout error", error);
    }
  };
  return (
    <div>
      <nav className="fixed w-full z-50 bg-neutral-800 flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <div className="px-1">
            <BookCheck height={28} width={28} className="text-white" />
          </div>
          <div className="text-xl underline text-white ml-2">
            <h1>Task Manager</h1>
          </div>
        </div>

        <div className="flex">
          <div>
            <Link
              className="text-gray-300 hover:text-white transition"
              href="/"
            >
              <div className=" px-7 flex items-center">
                {" "}
                <Home />
              </div>
              <div>
                <p className="text-sm flex justify-center">Home</p>
              </div>
            </Link>
          </div>
          <div>
            <Link
              className="text-gray-300 hover:text-white transition"
              href="../displayTasks"
            >
              <div className="px-7 flex items-center">
                {" "}
                <Clipboard />
              </div>
              <div>
                <p className="text-sm flex justify-center">Tasks</p>
              </div>
            </Link>
          </div>
          <button
            onClick={handleLogOut}
            className="text-gray-300 hover:text-red-500 transition"
          >
            <div className="px-7">
              <LogOut />
            </div>
            <div>
              <p className="text-sm">Logout</p>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}
