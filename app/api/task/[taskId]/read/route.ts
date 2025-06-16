import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { read } = await req.json();
    if (read === undefined)
      return NextResponse.json(
        { message: "read is required" },
        { status: 400 }
      );

    const updateTask = await prisma.task.update({
      where: { id: params.taskId },
      data: { read },
    });

    return NextResponse.json(updateTask);
  } catch (error) {
    console.error("error updating read", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
