import * as mongoose from "mongoose";
import { playerSchema } from "./schema/playerSchema";
import { lobbySchema } from "./schema/lobbySchema";

export const playerModel = mongoose.model("player", playerSchema);
export const lobbyModel = mongoose.model("lobby", lobbySchema);
