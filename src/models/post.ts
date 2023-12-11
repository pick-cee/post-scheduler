import mongoose, { Document, Schema } from 'mongoose';
import { IPost } from '../interfaces/post';

interface IPostDocument extends IPost, Document { }

const postSchema = new Schema<IPostDocument>({
    author: {
        required: true,
        type: Schema.Types.ObjectId,
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

const Post = mongoose.model<IPostDocument>('Post', postSchema)

export default Post