import * as mongoose from "mongoose";
import { playerSchema } from "./schema/playerSchema";
import { lobbySchema } from "./schema/lobbySchema";
import { ILobbyModel } from "./schema/interface/ILobbyModel";
import { IPlayerModel } from "./schema/interface/IPlayerModel";
import { accountDataSchema } from "./schema/playerDataSchema";
import { IPlayerDataModel } from "./schema/interface/IplayerDataModel";
import { missionSchema } from "./schema/missionSchema";

export const playerModel = mongoose.model<IPlayerModel>("player", playerSchema);
export const playerDataModel = mongoose.model<IPlayerDataModel>(
   "accountData",
   accountDataSchema
);
export const lobbyModel = mongoose.model<ILobbyModel>("lobby", lobbySchema);
export const missionModel = mongoose.model("mission", missionSchema);
