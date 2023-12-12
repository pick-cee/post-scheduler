import express, { NextFunction } from 'express'
import cron from 'node-cron'
import PostSchedule from '../models/post.schedule'
import client from '../config/redis'

export const createPostSchedule = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
) => {
    let user = await client.get('user') as any
    const { content, isPrivate, date } = request.body
    if (date) {
        const newDate = new Date(date)
        const hours = newDate.getUTCHours() + 1
        const minute = newDate.getUTCMinutes()
        const dayofMonth = newDate.getUTCDate()
        const month = newDate.getUTCMonth() + 1
        const dayOfWeek = newDate.getUTCDay()
        const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        const cronExpression = `${minute} ${hours} ${dayofMonth} ${month} ${adjustedDayOfWeek}`
        console.log(cronExpression)

        cron.schedule(cronExpression, async () => {
            try {
                const newSchedulePost = new PostSchedule({
                    content,
                    private: isPrivate,
                    date,
                    author: JSON.parse(user)
                })
                await newSchedulePost.save()
                return response.status(201).json({
                    message: 'Post has been scheduled.....',
                    data: { content, date }
                })
            }
            catch (err: any) {
                console.log(err.message)
            }
        })
    }
}