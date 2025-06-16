import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { taskId } = await context.params;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
