// Email utility - placeholder for actual email service integration
// In production, use services like Resend, SendGrid, AWS SES, etc.

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { to, subject, html } = options;

  // In production, integrate with actual email service
  console.log(`Sending email to ${to}: ${subject}`);
  
  // Example with Resend:
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Nexus <noreply@nexusflow.app>",
  //   to,
  //   subject,
  //   html,
  // });

  // For now, just log
  if (process.env.NODE_ENV === "development") {
    console.log("Email content:", html);
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  
  await sendEmail({
    to: email,
    subject: "Reset your Nexus password",
    html: `
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  
  await sendEmail({
    to: email,
    subject: "Verify your Nexus email",
    html: `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Welcome to Nexus",
    html: `
      <h1>Welcome to Nexus, ${name}!</h1>
      <p>Thank you for signing up. Start building your automated workflows today!</p>
      <p>Get started: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard">Go to Dashboard</a></p>
    `,
  });
}

export async function sendTeamInviteEmail(email: string, inviteUrl: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: "You're invited to a Nexus Flow workspace",
    html: `
      <h1>Workspace Invitation</h1>
      <p>You were invited to join a Nexus Flow workspace.</p>
      <p>Accept your invite here:</p>
      <a href="${inviteUrl}">${inviteUrl}</a>
      <p>This link expires in 7 days.</p>
    `,
  });
}
