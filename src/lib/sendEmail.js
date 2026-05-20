import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Check if SMTP is configured
  if (!user || !pass || user === "your-email@gmail.com" || pass === "your-app-password") {
    console.warn(
      `[SMTP NOT CONFIGURING] Nodemailer skipped sending to ${to} because SMTP_USER or SMTP_PASS is not configured in .env.local.`
    );
    return { success: false, reason: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host || "smtp.gmail.com",
      port: parseInt(port || "587"),
      secure: port === "465", // true for 465, false for other ports (587, etc.)
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Beema Dukaan" <${user}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`[SMTP] Email sent successfully to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Nodemailer sending error:", error);
    throw error;
  }
}
