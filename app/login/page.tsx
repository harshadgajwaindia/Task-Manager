"use client";

import { headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   try {
     const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/");
    } else {
      console.log("error occured");
    }
   } catch (error) {
    console.log("Something went wrong:", error);
   } finally{
    setLoading(false);
   }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col bg-gradient-to-br from-neutral-50 to-neutral-200 text-black">
        <div className="shadow-2xl rounded p-4">
          <div className="p-3 flex items-center justify-center underline text-2xl">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="p-3">
              <input
                className="px-7 border border-neutral-300 p-1 rounded"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="p-3">
              <input
                className="px-7 border border-neutral-300 p-1 rounded"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center p-3">
              <button
                type="submit"
                className="bg-neutral-700 hover:bg-neutral-600 text-white border rounded px-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <p>New to Task Manager?</p>
            <Link
              href="/signup"
              className="text-blue-700 hover:text-blue-500 underline px-1"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
