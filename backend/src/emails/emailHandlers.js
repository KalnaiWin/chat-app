import { resendClient, sender } from "../lib/resend.js";
import { welcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: `Welcome to Chat App`,
    html: welcomeEmailTemplate(name, clientURl),
  });

  if (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome email sent successfully", data);
};
