import { ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IPost {
    author: string | ObjectId
    content: string
    private: boolean
    date?: Date
}