import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Classroom from "../models/Classroom";
import User from "../models/Users";
import convertHourToMinutes from "../utils/convertHoursToMinutes";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
  }

export default {
    async show(req:Request, res: Response) {
        const {user_id} = req.params;

        const classroomsRepository = getRepository(Classroom);

        const classroom = await classroomsRepository.find({
            where: {
                user: user_id
            }
        });

        return res.json(classroom)
    },

    async create(req:Request, res: Response) {
        const {user_id} = req.params;
        const {subject, cost, schedules} = req.body;

        const usersRepository = getRepository(User);
        const classroomsRepository = getRepository(Classroom);

        const user = await usersRepository.findOneOrFail(user_id)
        .then(user => {
            return user
        })
        .catch(() => {
            return undefined
        });

        if (user == undefined) {
            return res.status(400).json({ message: "User not found" })
        }

        const classSchedule = schedules.map((scheduleItem: ScheduleItem) => ({
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to)
        }))

        try {
            const classroom = classroomsRepository.create({
                subject,
                cost,
                user,
                schedules: classSchedule
            });
    
            await classroomsRepository.save(classroom)
            
            return res.json(classroom)
        } catch (error) {
            console.log(error)
        }
    }
}