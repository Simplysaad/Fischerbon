import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: process.env.SMTP_HOST === "smtp.gmail.com" ? true : undefined,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export default async function sendEmail(emailOptions) {
  try {
    const { to, subject, template, data, message } = emailOptions;
    const templateOptions = {
      subject,
      logoUrl: `${process.env.BASE_URL}/Images/fischerbon-logo.png`,
      supportEmail: "support@fischerbon.com",
    };
    if (template && data) {
      let templatePath = path.join(
        __dirname,
        "..",
        "Templates",
        `${template}.ejs`
      );

      let htmlMessage = await ejs.renderFile(templatePath, data);
      templateOptions.message = htmlMessage;
    } else {
      templateOptions.message = message;
    }

    const templatePath = path.join(__dirname, "..", "Templates", "layout.ejs");

    const emailHtml = await ejs.renderFile(templatePath, templateOptions);

    // Send email
    await transporter.sendMail({
      from: '"Engr. Iskeel" <noreply@fischerbon.com>',
      to,
      subject,
      html: emailHtml,
    });

    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
