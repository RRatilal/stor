import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/Users";


export default {
    async create(req: Request, res: Response) {
        const { name, surname, email, password, whatsapp, bio } = req.body;

        const usersRepository = getRepository(User);

        const user = usersRepository.create({
            name,
            surname,
            email,
            password,
            whatsapp,
            bio
        });

        await usersRepository.save(user);

        return res.status(201).json(user);
    }
}