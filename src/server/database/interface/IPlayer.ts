import { IPlayerModel } from "../schema/interface/IPlayerModel";
export interface IPlayer {
   userName: IPlayerModel["userName"];
   socialID: IPlayerModel["socialID"];
   rank?: IPlayerModel["rank"];
   createdAt?: IPlayerModel["createdAt"];
}
