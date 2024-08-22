import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users";
import { Request, Response } from "express";
import { AuthToken } from "../entities/authToken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import config from "../../config";

class SessionController {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);
    private tokenRepository: Repository<AuthToken> = AppDataSource.getRepository(AuthToken);

    constructor() {
        this.login = this.login.bind(this);
    }

    public async login(req: Request, res: Response) {
        try {
            const { data, password } = req.body;

            const user = await this.userRepository.findOne({
                where: [{ email: data }, { username: data }]
            })

            if(!user)
                return res.status(404).json({ message: "User not found!" });

            if(!user.enabled)
                return res.status(403).json({ message: "User not enabled!" });

            const { password: userPassword, ...rest } = user;

            const isCorrect = await bcrypt.compare(password, userPassword);

            if(isCorrect) {
                const oldToken = await this.tokenRepository.findOneBy({ userCpf: user.cpf, expired: false });

                if(oldToken) {
                    oldToken.expired = true;
                    await this.tokenRepository.save(oldToken);
                }

                const token = jwt.sign(rest, config.JWT_SECRET);

                const authToken = new AuthToken();

                authToken.code = uuidv4();
                authToken.token = token;
                authToken.userCpf = user.cpf;
                authToken.createdAt = moment().toDate();
                authToken.expiresAt = moment().add(3, "days").toDate();

                await this.tokenRepository.save(authToken);

                return res.json({ token: authToken, user: rest });
            } else {
                return res.status(401).json({ message: "Invalid credentials!" });
            }
        } catch(error) {
            return res.status(500).json({ message: error });
        }
    }
}

const sessionController = new SessionController();

export default sessionController;