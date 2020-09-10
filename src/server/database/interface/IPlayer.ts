import { IPlayerModel } from "../schema/interface/IPlayerModel";
export interface IPlayer {
   userName?: IPlayerModel["userName"];
   rank?: IPlayerModel["rank"];
   createdAt?: IPlayerModel["createdAt"];
}
