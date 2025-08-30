import User from "../models/userModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const requestResetPassord = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPassword = crypto.createHash("sha256").update(resetToken).digest("hex");
        const user = await User.findOneAndUpdate({ email }, { resetPassword, resetPasswordExpire: Date.now() + 10 * 60 * 1000 }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.resetPassword= resetPassword;
        user.resetPasswordExpire= Date.now() + 10 * 60 * 1000;
        await user.save();
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }

        })
        const mailsOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 10 minutes.</p>`,
        }
        const info = await transporter.sendMail(mailsOptions);
        res.status(200).json({ message: "Reset email sent", info });
    } catch (error) {
  res.status(500).json({ message: "Server error", error: error.message });
    }
}