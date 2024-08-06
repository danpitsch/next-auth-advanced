import PasswordResetEmail from "@/emails/password-reset";
import TwoFactorEmail from "@/emails/two-factor";
import VerificationEmail from "@/emails/verification";
import { Resend } from "resend";

import nodemailer from 'nodemailer';
import { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  console.log("./lib/mail.ts > process.env.NEXT_PUBLIC_EMAIL_USERNAME", process.env.NEXT_PUBLIC_EMAIL_USERNAME);
  console.log("./lib/mail.ts > process.env.NEXT_PUBLIC_EMAIL_PASSWORD", process.env.NEXT_PUBLIC_EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: "mail.fuzionworx.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const httpBody = VerificationEmail({ confirmLink: confirmLink, name: name });

  console.log("./lib/mail.ts > httpBody", httpBody);

  await transporter.sendMail({
    from: "onboarding@fuzionworx.com",
    to: email,
    subject: "[🔐Auth]: Please verify your email.",
    html: httpBody
  });
}

export const sendPasswordResetEmail = async (email: string, token: string, name: string) => {
  const resetPasswordLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "[🔐Auth]: Reset you password.",
    react: PasswordResetEmail({ resetPasswordLink: resetPasswordLink, name: name })
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string, name: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "[🔐Auth]: Please verify Login Attempt.",
    react: TwoFactorEmail({ token, name })
  })
}