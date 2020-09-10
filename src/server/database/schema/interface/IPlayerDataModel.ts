import { Document } from "mongoose";

export interface IPlayerDataModel extends Document {
   userName: string;
   socialID: number;
   ip: string;
   hwid: number;
}
