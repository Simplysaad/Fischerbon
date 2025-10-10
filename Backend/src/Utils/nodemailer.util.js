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

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS
//   }
// });

export default async function sendEmail(emailOptions) {
  try {
    const { to, subject, template, data } = emailOptions;
    if (!template) throw new Error("Email template name is required");

    const templatePath = path.join(
      __dirname,
      "..",
      "Templates",
      `${template}.ejs`
    );
    const contentHtml = await ejs.renderFile(templatePath, data);

    const emailHtml = await ejs.renderFile(
      path.join(__dirname, "..", "Templates", "layout.ejs"),
      {
        subject,
        logoUrl: `${process.env.BASE_URL}/Images/fischerbon-logo.png`,
        supportEmail: "support@fischerbon.com",
        body: contentHtml,
      }
    );

    await transporter.sendMail({
      from: "Engr. Iskeel <noreply@fischerbon.com>",
      to,
      subject,
      html: emailHtml,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
