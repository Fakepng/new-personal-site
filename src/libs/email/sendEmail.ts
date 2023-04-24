import nodemailer from "nodemailer";
import { z } from "zod";

export default async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const email = z.string().email();

  const mailReceiver = email.parse(to);

  const transportOptions = {
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "465"),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  };

  const mailTransport = nodemailer.createTransport(transportOptions);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: mailReceiver,
    subject,
    text,
  };

  const result = await mailTransport.sendMail(mailOptions);

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}
