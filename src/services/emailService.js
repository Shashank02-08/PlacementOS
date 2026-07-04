const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // false for port 587
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

class EmailService {
    async sendMail({ to, subject, html }) {
        return transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });
    }
}

module.exports = new EmailService();