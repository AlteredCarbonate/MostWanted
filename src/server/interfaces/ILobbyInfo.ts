import { LobbyStatus } from "../enums/LobbyStatus";

export interface ILobbyInfo {
   id: number;
   playerName: string;
   rank: number;
   status: LobbyStatus;
}
