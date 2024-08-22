import nodemailer from "nodemailer";
import config from "../../config";

const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false,
    auth: {
        user: config.EMAIL_AUTH_USER,
        pass: config.EMAIL_AUTH_PASSWORD
    }
});

export { transporter };