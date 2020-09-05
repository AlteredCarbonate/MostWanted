import * as mongoose from "mongoose";

export const lobbySchema = new mongoose.Schema({
   userName: String,
   role: String,
});
