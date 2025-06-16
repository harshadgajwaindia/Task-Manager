"use client";

import { useState } from "react";

export default function AddTask() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/task", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (res.ok) {
      alert("Task Added Successfully");
      setDescription("");
    } else {
      alert("Error in adding Task");
    }
    } catch (error) {
      console.error("error occured:", error)
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-semibold text-center text-neutral-700 mb-6 underline">
          Add New Task
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-700 border border-neutral-300 rounded px-4 py-2 placeholder:text-gray-400 focus:transition"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-neutral-700 hover:bg-neutral-800 text-white py-2 rounded transition"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
