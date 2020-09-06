import { LobbyStates } from "../../systems/lobby/enum/LobbyStates";

export interface ILobby {
   readonly _id?: number;
   userName: any;
   role: string;
   state: LobbyStates;
}
