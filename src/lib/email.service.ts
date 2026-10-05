import { emailTransporter } from "./email.provider";

export class EmailService {
    async sendPasswordResetOtp(
        email: string,
        otp: string
    ): Promise<void> {
        await emailTransporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div>
                    <h2>Password Reset</h2>
                    <p>Your password reset OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP will expire in 5 minutes.</p>
                    <p>If you did not request a password reset,
                    please ignore this email.</p>
                </div>
            `,
        });
    }
}