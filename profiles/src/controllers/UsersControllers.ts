import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class UserController {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req: Request, res: Response) {
        try {
            const users = await this.userRepository.find({
                relations: {
                    role: true,
                    occupation: true
                }
            });

            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { cpf } = req.params;

            const user = await this.userRepository.findOne({
                where: { cpf },
                relations: {
                    role: true,
                    occupation: true
                }
            });

            if(!user) return res.status(404).json({ message: "User not found" });

            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { cpf, name, email, occupation_code, role_code }: UserStoreData = req.body;

            const user = this.userRepository.create({ cpf, name, email, role_code, occupation_code });

            const nameArray = name.split(" ");
            let username = nameArray[0].toLocaleLowerCase();
            let suffix = (new Date()).getTime().toString();
            if(nameArray.length > 1) {
                suffix = nameArray[1].toLocaleLowerCase();
            }

            user.username = `${username}.${suffix}`.normalize('NFD').replace(/[\u0300-\u036f]/g, "");;

            const newUser = await this.userRepository.save(user);

            return res.status(201).json({ user: newUser });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data: UserUpdateData = req.body;
            const { cpf } = req.params;

            const user = await this.userRepository.findOneBy({ cpf });

            if(!user) return res.status(404).json({ message: "User not found!" });

            this.userRepository.merge(user, data);
            await this.userRepository.save(user);

            return res.json({ message: "User updated!" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { cpf } = req.params;

            const user = await this.userRepository.findOneBy({ cpf });
            if(!user) return res.status(404).json({ message: "User not found!" });

            await this.userRepository.delete(user);

            return res.json({ message: "User deleted!" });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}

export default new UserController();