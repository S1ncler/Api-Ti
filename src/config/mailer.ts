import nodemailer from "nodemailer";
import "dotenv/config";

export const tranporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

tranporter.verify().then(() => {
  console.log("ready for send emails");
});
