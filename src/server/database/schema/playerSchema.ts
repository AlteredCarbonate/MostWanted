import * as mongoose from "mongoose";
import * as moment from "moment";

export const playerSchema = new mongoose.Schema({
   userName: { type: String, required: true },
   socialID: Number,
   rank: { type: Number, default: 0 },
   createdAt: { type: Date, default: moment().format("YYYY/MM/DD hh:mm:ss") },
});
