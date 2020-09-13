import * as mongoose from "mongoose";

export const accountDataSchema = new mongoose.Schema({
   playerReference: { type: mongoose.Schema.Types.ObjectId, ref: "player" },
   socialID: Number,
   ip: String,
   hwid: Number,
});
