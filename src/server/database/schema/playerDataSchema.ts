import * as mongoose from "mongoose";

export const accountDataSchema = new mongoose.Schema({
   userName: { type: mongoose.Schema.Types.ObjectId, ref: "player" },
   socialID: Number,
   ip: String,
   hwid: Number,
});
