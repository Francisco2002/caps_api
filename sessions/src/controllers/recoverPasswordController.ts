import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/users";
import { AppDataSource } from "../data-source";
import { transporter } from "../utils/mails";
import bcrypt from "bcrypt";
import config from "../../config";

class RecoverPasswordController {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
        this.sendRecoverEmail = this.sendRecoverEmail.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);
    }

    async sendRecoverEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;

            const user = await this.userRepository.findOneBy({ email });

            if(!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const mailOptions = {
                from: config.EMAIL_AUTH_USER,
                to: user.email,
                subject: 'Email de recuperação de senha',
                text: 'Aqui virá o conteúdo para você recuperar a sua senha.'
              };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                  return res.status(500).json({ message: error });
                } else {
                    return res.status(200).json({ message: 'Email sent: ' + info.response });
                }
              });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async recoverPassword(req: Request, res: Response) {
        try {
            const { email, newPassword } = req.body;

            const user = await this.userRepository.findOneBy({ email });

            if(!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            user.password = await bcrypt.hash(newPassword, config.BCRYPT_SALT);
            await this.userRepository.save(user);

            return res.status(200).json({ message: "Password changed!" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export default new RecoverPasswordController();