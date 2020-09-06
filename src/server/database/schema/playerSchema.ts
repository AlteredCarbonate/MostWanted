import * as mongoose from "mongoose";
import * as moment from "moment";

export const playerSchema = new mongoose.Schema({
   userName: { type: String, required: true },
   socialID: Number,
   rank: Number,
   createdAt: { type: Date, default: moment().format() },
});
