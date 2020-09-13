import { Document } from "mongoose";

import { LobbyStates } from "../../../systems/lobby/enum/LobbyStates";
import { IPlayerModel } from "./IPlayerModel";
import { LobbyRoles } from "../../../systems/lobby/enum/LobbyRoles";

export interface ILobbyModel extends Document {
   playerReference: IPlayerModel["_id"];
   role: LobbyRoles;
   state: LobbyStates;
}
