import * as mongoose from "mongoose";

export const playerSchema = new mongoose.Schema({
   userName: String,
   socialID: Number,
   rank: Number,
   accountCreation: Date,
});
