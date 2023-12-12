import mongoose, { Document, Schema } from 'mongoose';
import { IPostSchedule } from '../interfaces/post';

interface IPostScheduleDocument extends IPostSchedule, Document { }

const postScheduleSchema = new Schema<IPostScheduleDocument>({
    author: {
        required: true,
        type: Schema.Types.ObjectId || String,
        ref: 'User'
    },
    content: {
        required: true,
        type: String
    },
    private: {
        type: Boolean,
        default: false,
        required: false
    },
    date: {
        type: Date,
        required: false
    }
}, { timestamps: true })

const PostSchedule = mongoose.model<IPostScheduleDocument>('Post-Schedule', postScheduleSchema)

export default PostSchedule