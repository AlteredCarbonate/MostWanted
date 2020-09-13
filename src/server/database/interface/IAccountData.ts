import { IPlayerModel } from "../schema/interface/IPlayerModel";
import { IAccountDataModel } from "../schema/interface/IAccountDataModel";

export interface IAccountData {
   playerReference?: IPlayerModel["_id"];
   socialID?: IAccountDataModel["socialID"];
   ip?: IAccountDataModel["ip"];
   hwid?: IAccountDataModel["hwid"];
}
