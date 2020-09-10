import { Document } from "mongoose";

export interface IPlayerModel extends Document {
   userName: string;
   rank: number;
   createdAt: string;
}
