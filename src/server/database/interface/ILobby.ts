import { IPlayerModel } from "../schema/interface/IPlayerModel";
import { ILobbyModel } from "../schema/interface/ILobbyModel";

export interface ILobby {
   playerReference?: IPlayerModel["_id"];
   role?: ILobbyModel["role"];
   state?: ILobbyModel["state"];
}
