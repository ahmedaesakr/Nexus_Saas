import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { z } from "zod";
import crypto from "crypto";

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = resetSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({
        message: "If an account exists, a reset link will be sent",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        // In a real app, store the token in a separate table
        // For now, we'll just send the email (simulated)
      },
    });

    // Send reset email (placeholder - implement with actual email service)
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({
      message: "If an account exists, a reset link will be sent",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    console.error("Password reset error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
