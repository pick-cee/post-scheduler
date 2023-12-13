import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import redisClient from './redis'
import { error } from 'console';
import connectDB from './database';

class RabbitMQConnection {
    connection!: Connection;
    channel!: Channel;
    private connected!: Boolean

    async connect() {
        if (this.connected && this.channel) return
        else this.connected = true

        try {
            console.log(`⌛️ Connecting to Rabbit-MQ Server`)
            this.connection = await client.connect(
                'amqp://localhost'
            )
            await redisClient.connect().then(() => {
                console.log('Redis connected successfully')
            })
            console.log(`✅ Rabbit MQ Connection is ready`)
            await connectDB()

            this.channel = await this.connection.createChannel()
            console.log(`🛸 Created RabbitMQ Channel successfully`)
        }
        catch (error: any) {
            console.error('Rabbit mq', error.message)
        }
    }

    async sendToQueue(queue: string, { user, content, isPrivate, date }: any) {
        this.connection = await client.connect(
            'amqp://localhost'
        )
        this.channel = await this.connection.createChannel()
        console.log(`🛸 Created RabbitMQ Channel successfully`)
        if (this.channel) {
            this.channel.assertQueue(`${queue}`, { durable: false })
                .then(() => {
                    this.channel.sendToQueue(
                        `${queue}`,
                        Buffer.from(JSON.stringify({ user, content, date, isPrivate }))
                    )
                    console.log(`Task has been sent to the ${queue} queue`)
                }).catch((err: any) => {
                    console.error('queue', err)
                    throw err
                })
        }
        else {
            console.log('not connected')
        }
    }
    catch(error: any) {
        console.error('queue', error)
        throw error
    }
}


const mqConnection = new RabbitMQConnection()

export default mqConnection