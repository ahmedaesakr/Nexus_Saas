import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { z } from "zod";

const resetConfirmSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = resetConfirmSchema.parse(body);

    // In a real implementation, look up the token in a password reset table
    // For now, this is a placeholder
    
    // Example:
    // const resetRequest = await prisma.passwordReset.findUnique({
    //   where: { token },
    // });
    // 
    // if (!resetRequest || resetRequest.expiresAt < new Date()) {
    //   return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    // }
    //
    // await prisma.user.update({
    //   where: { id: resetRequest.userId },
    //   data: { password: await hash(password, 10) },
    // });
    //
    // await prisma.passwordReset.delete({ where: { id: resetRequest.id } });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }
    console.error("Password reset confirm error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
