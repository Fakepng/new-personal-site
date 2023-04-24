import { IntlError } from "next-intl";

import sendEmail from "@/libs/email/sendEmail";

export default function reportIntlError(error: IntlError) {
  sendEmail({
    to: process.env.DEV_EMAIL,
    subject: `Personal Website Error ${error.code}`,
    text: `Error: ${error.code}\n\n${error.originalMessage}`,
  });
}
