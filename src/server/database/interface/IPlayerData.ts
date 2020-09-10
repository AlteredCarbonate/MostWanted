import { IPlayerModel } from "../schema/interface/IPlayerModel";
import { IPlayerDataModel } from "../schema/interface/IplayerDataModel";

export interface IPlayerData {
   userName?: IPlayerModel["_id"];
   socialID?: IPlayerDataModel["socialID"];
   ip?: IPlayerDataModel["ip"];
   hwid?: IPlayerDataModel["hwid"];
}
