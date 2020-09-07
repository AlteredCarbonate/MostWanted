import { LobbyStates } from "../../../systems/lobby/enum/LobbyStates";
import { Document } from "mongoose";
import { IPlayerModel } from "./IPlayerModel";

export interface ILobbyModel extends Document {
   userName: IPlayerModel["_id"];
   role: string;
   state: LobbyStates;
}
