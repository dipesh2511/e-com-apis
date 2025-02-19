import nodemailer from 'nodemailer';
import { generateOtpHtml } from './otphtmlcontent.js';
import crypto from 'crypto';

export default class ResetPasswordModel {
    constructor(email, otp) {
        this.email = email;
        this.otp = otp;
    }

    static createOtp() {
        return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
    }

    static async sendOtp(email, otp) {
        let transport = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_CREDENTIAL, 
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Password",
            html: generateOtpHtml(otp)
        };

        try {
            let info = await transport.sendMail(mailOptions);
            console.log("Email sent:", info.response);
        } catch (err) {
            console.error("Error sending email:", err);
        }
    }
}
