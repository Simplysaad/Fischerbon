import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

export const sendEmail = async (emailOptions) => {
  try {
    const { to, subject, template, data } = emailOptions;
    // Generate HTML using EJS template
    const templatePath = path.join(__dirname, '..', 'Templates', `${template}.ejs`);
    
    if (!template) {
      throw new Error('Email template name is required');
    }

    const html = await ejs.renderFile(templatePath, data);

    await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to,
      subject,
      html
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
