import express, { NextFunction, response } from 'express'
import cron from 'node-cron'
import PostSchedule from '../models/post.schedule'
import client from '../config/redis'
import mqConnection from '../config/rabbitmq'
import User from '../models/user'
import Post from '../models/post'

export const createPostSchedule = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
) => {
    try {
        let user = await client.get('user') as any
        const { content, isPrivate, date } = request.body
        const parsedUser = JSON.parse(user)

        if (date) {
            await mqConnection.connect()
            await mqConnection.sendToQueue('schdeule-post', { parsedUser, content, date, isPrivate })

            const schdeulePost = new PostSchedule({
                author: JSON.parse(user),
                content,
                date,
                private: isPrivate
            })

            await schdeulePost.save()
            return response.status(201).json({
                message: `Your post has been scheduled to be posted on ${new Date(date)}`,
                data: request.body
            })
        }
    }
    catch (error: any) {
        return response.status(500).json({
            message: 'Server error',
            error: error
        })
    }
}


export const postSchedule = async (
    user: any, content?: string, date?: any, isPrivate?: boolean
) => {
    let currUser;
    currUser = await client.get('user') as any
    user = await User.findOne({ _id: JSON.parse(currUser) })
    if (!user) {
        throw new Error('User not found')
    }
    if (date) {
        const newDate = new Date(date)
        const hours = newDate.getUTCHours() + 1
        const minute = newDate.getUTCMinutes()
        const dayofMonth = newDate.getUTCDate()
        const month = newDate.getUTCMonth() + 1
        const dayOfWeek = newDate.getUTCDay()
        const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        const cronExpression = `${minute} ${hours} ${dayofMonth} ${month} ${adjustedDayOfWeek}`

        cron.schedule(cronExpression, async () => {
            try {
                const newPost = new Post({
                    author: user,
                    content,
                    private: isPrivate
                })
                await newPost.save()
                console.log('Scheduled post has been posted......')
            }
            catch (error: any) {
                console.log('Cron job:', error.message)
            }
        })
    }
}

