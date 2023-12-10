import { ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IPost {
    author: IUser | ObjectId
    content: string
    private: boolean
}