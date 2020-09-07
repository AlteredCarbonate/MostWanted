import { Document } from "mongoose";

export interface IPlayerModel extends Document {
   userName: string;
   socialID: number;
   rank: number;
   createdAt: string;
}
