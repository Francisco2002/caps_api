import { Request, Response } from "express";
import config from "../../config";
import { Repository } from "typeorm";
import { User } from "../entities/users";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";

class FirstAccessController {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
        this.firtsAccess = this.firtsAccess.bind(this);
    }

    async firtsAccess(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await this.userRepository.findOneBy({ username, enabled: false });

            if(!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            user.password = await bcrypt.hash(password, config.BCRYPT_SALT);
            user.enabled = true;
            
            await this.userRepository.save(user);

            return res.json({ message: "User enable to access!" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export default new FirstAccessController();