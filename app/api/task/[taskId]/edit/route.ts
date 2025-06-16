import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Record<string, string> }
) {
  try {
    const { taskId } = await params;

    const { description } = await req.json();

    if (description === undefined) {
      return NextResponse.json(
        { message: "description is required" },
        { status: 400 }
      );
    }

    const updateTask = await prisma.task.update({
      where: { id: taskId },
      data: { description },
    });

    return NextResponse.json(updateTask);
  } catch (error) {
    console.error("Error updating description", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
