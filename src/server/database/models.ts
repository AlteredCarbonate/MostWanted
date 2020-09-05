import * as mongoose from "mongoose";
import { playerSchema } from "./schema/playerSchema";

export const playerModel = mongoose.model("player", playerSchema);
export const lobbyModel = mongoose.model("lobby", playerSchema);
