import { ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IPost {
    author: string | ObjectId
    content: string
    private: boolean
}

export interface IPostSchedule extends IPost {
    date: Date
}