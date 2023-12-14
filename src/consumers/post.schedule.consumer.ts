import mqConnection from "../config/rabbitmq";
import client from "../config/redis";
import { postSchedule } from "../controllers/post.schedule";

const connect = async () => {
    await mqConnection.connect()

    const channel = mqConnection.channel

    const queue: string = 'schdeule-post'

    channel.assertQueue(`${queue}`, {
        durable: false
    })

    console.log(`Worker is waiting for tasks in the ${queue} queue.`)

    channel.consume(`${queue}`, async (message: any) => {
        if (!message) {
            console.log('no message')
        }
        let { user, content, date, isPrivate } = JSON.parse(message!.content.toString())
        try {
            user = await client.get('user') as any
            await postSchedule(JSON.parse(user), content, date, isPrivate).then(() => {
                console.log(`Post has been scheduled to be posted on ${date}`)
            })
        }
        catch (err: any) {
            console.log('Consumer error: ', err)
        }
        channel.ack(message)
    })
}

connect()

