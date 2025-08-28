import nodemailer from "nodemailer";

const transporter = new nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export default transporter;
