import PasswordResetEmail from "@/emails/password-reset";
import TwoFactorEmail from "@/emails/two-factor";
import VerificationEmail from "@/emails/verification";

import nodemailer from 'nodemailer';
import { ReactElement } from "react";

const publicUrl = process.env.NEXT_PUBLIC_APP_URL;
const domain = process.env.NEXT_DOMAIN;

const transporter = nodemailer.createTransport({
  host: "mail.fuzionworx.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const confirmLink = `${publicUrl}/auth/new-verification?token=${token}`;

  console.log("./lib/mail.ts > process.env.NEXT_PUBLIC_EMAIL_USERNAME", process.env.NEXT_PUBLIC_EMAIL_USERNAME);
  console.log("./lib/mail.ts > process.env.NEXT_PUBLIC_EMAIL_PASSWORD", process.env.NEXT_PUBLIC_EMAIL_PASSWORD);

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const httpBody = VerificationEmail({ confirmLink: confirmLink, name: name });

  await transporter.sendMail({
    from: `onboarding@${domain}`,
    to: email,
    subject: "[🔐Auth]: Please verify your email.",
    html: httpBody
  });
}

export const sendPasswordResetEmail = async (email: string, token: string, name: string) => {
  const resetPasswordLink = `${publicUrl}/auth/new-password?token=${token}`;

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  await transporter.sendMail({
    from: `onboarding@${domain}`,
    to: email,
    subject: "[🔐Auth]: Reset you password.",
    html: PasswordResetEmail({ resetPasswordLink: resetPasswordLink, name: name })
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string, name: string) => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  await transporter.sendMail({
    from: `onboarding@${domain}`,
    to: email,
    subject: "[🔐Auth]: Please verify Login Attempt.",
    html: TwoFactorEmail({ token, name })
  })
}