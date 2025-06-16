"use client";

import TasksSkeleton from "@/components/TasksSkeleton";
import { CheckCheck, FileX2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  description: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default function DisplayTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/displayTasks", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      } else {
        console.log("Error fetching tasks");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });

      if (res.ok) {
        alert("Task deleted successfully");
        fetchTasks();
      } else {
        console.log("Error deleting task");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const markAsRead = async (taskId: string) => {
    try {
      const res = await fetch(`/api/task/${taskId}/read`, {
        method: "PATCH",
        cache: "no-store",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (res.ok) {
        if (res.ok) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, read: true } : task
            )
          );
        }

        alert("Task marked as read");
      } else {
        console.error("Error marking task as read");
      }
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  const updateDescription = async (taskId: string, newDescription: string) => {
    try {
      const res = await fetch(`/api/task/${taskId}/edit`, {
        method: "PATCH",
        cache: "no-store",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription }),
      });

      if (res.ok) {
        alert("Description updated successfully");
        fetchTasks();
      } else {
        console.error("Error updating description");
      }
    } catch (error) {
      console.error("Update description error:", error);
    }
  };

  return (
    <div className=" min-h-screen text-black flex flex-col bg-gradient-to-br from-neutral-100 to-neutral-200">
      <div className="py-20 px-5">
        {tasks.length === 0 ? (
          <div>
            {loading ? (
              <TasksSkeleton />
            ) : (
              <div className="flex justify-center items-center">
                <FileX2 className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full rounded p-5">
            <ul className="space-y-6">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className=" shadow rounded bg-neutral-100 hover:bg-neutral-200 transition"
                >
                  <div className="flex justify-end py-1">
                    <button
                      onClick={() => markAsRead(task.id)}
                      disabled={task.read}
                      className={`px-3 ${
                        task.read
                          ? "text-green-500"
                          : "text-neutral-600 hover:text-black transition"
                      }`}
                    >
                      <CheckCheck />
                    </button>
                    <button
                      onClick={() =>
                        updateDescription(
                          task.id,
                          prompt("Enter new description:", task.description) ||
                            task.description
                        )
                      }
                      className="px-3 text-blue-500 hover:text-blue-600 transition"
                    >
                      <Pencil />
                    </button>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-3"
                      >
                        <Trash2 className="text-red-400 hover:text-red-600 transition" />
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold p-2 px-4 text-lg">
                    {task.description}
                  </div>
                  <span className="flex justify-end text-neutral-600 p-2 sm:text-sm">
                    Created: {new Date(task.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
