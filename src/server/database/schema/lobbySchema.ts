import * as mongoose from "mongoose";
import { LobbyStates } from "../../systems/lobby/enum/LobbyStates";
import { LobbyRoles } from "../../systems/lobby/enum/LobbyRoles";

export const lobbySchema = new mongoose.Schema({
   userName: { type: mongoose.Schema.Types.ObjectId, ref: "player" },
   role: {
      type: String,
      enum: Object.values(LobbyRoles),
      default: LobbyRoles.Undefined,
   },
   state: {
      type: String,
      enum: Object.values(LobbyStates),
      default: LobbyStates.Init,
   },
});
