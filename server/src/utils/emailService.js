import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// export const sendEmail = async (to, subject, text) => {
//   try {

//     console.log("Sending email to:", to);
//     console.log("EMAIL USER:", process.env.EMAIL_USER);
//     console.log("EMAIL PASS:", process.env.EMAIL_PASS);

//     await transporter.verify();
//     console.log("SMTP connected successfully");

//     const info = await transporter.sendMail({
//       from: `"Actify System" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text
//     });

//     console.log("Email sent:", info.messageId);

//   } catch (err) {
//     console.error("EMAIL ERROR:", err);
//   }
// };


export const sendEmail = async (to, subject, html) => {

  await transporter.sendMail({
    from: `"Actify System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });

};