import { Request, Response } from "express";
import { join } from "path";
import { Brackets, createQueryBuilder, getRepository } from "typeorm";
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
        const filters = req.query;

        const classroomsRepository = getRepository(Classroom);

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to serch classes'
            })
        }

        const timeImMinites = convertHourToMinutes(time);


        const classroom = await classroomsRepository.createQueryBuilder("classroom")
            .leftJoinAndSelect("classroom.user", "user")
            .leftJoinAndSelect("classroom.schedules", "schedule")
            .where("classroom.subject = :subject", { subject: subject })
            .andWhere("schedule.week_day = :week_day", { week_day: Number(week_day) })
            .andWhere("schedule.from <= :from", { from: timeImMinites })
            .andWhere("schedule.to > :to", { to: timeImMinites })
            .getMany()

        return res.json(classroom)
    },

    async create(req:Request, res: Response) {
        const {userId} = req.params;
        const {subject, cost, schedules} = req.body;

        const usersRepository = getRepository(User);
        const classroomsRepository = getRepository(Classroom);

        const user = await usersRepository.findOneOrFail(userId)
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