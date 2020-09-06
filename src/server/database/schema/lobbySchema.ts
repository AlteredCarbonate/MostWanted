import * as mongoose from "mongoose";
import { LobbyStates } from "../../systems/lobby/enum/LobbyStates";

export const lobbySchema = new mongoose.Schema({
   userName: { type: mongoose.Schema.Types.ObjectId, ref: "player" },
   role: String,
   state: {
      type: String,
      enum: Object.values(LobbyStates),
      default: LobbyStates.Init,
   },
});
