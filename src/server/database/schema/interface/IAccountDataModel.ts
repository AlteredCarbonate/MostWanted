import { Document } from "mongoose";

export interface IAccountDataModel extends Document {
   playerReference: string;
   socialID: number;
   ip: string;
   hwid: number;
}
