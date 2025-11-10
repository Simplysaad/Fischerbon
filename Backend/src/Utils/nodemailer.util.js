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
  const templatesDir = path.join(__dirname, "..", "Templates");
  try {
    const { to, subject, template, data = {}, message } = emailOptions;

    // Prepare shared data for both templates
    const sharedData = {
      subject,
      logoUrl: `${process.env.BASE_URL}/Images/fischerbon-logo.png`,
      supportEmail: "support@fischerbon.com",
      ...data,
    };

    let htmlMessage;

    if (template) {
      const templatePath = path.join(templatesDir, `${template}.ejs`);
      // Render the custom template with shared data
      htmlMessage = await ejs.renderFile(templatePath, sharedData);
    } else {
      htmlMessage = message || "";
    }

    // Pass shared data plus rendered message to layout.ejs
    const layoutPath = path.join(templatesDir, "layout.ejs");
    const emailHtml = await ejs.renderFile(layoutPath, {
      ...sharedData,
      message: htmlMessage, // injected as HTML partial
    });

    await transporter.sendMail({
      from: '"Engr. Iskeel" <noreply@fischerbon.com>',
      to,
      subject,
      html: emailHtml,
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
