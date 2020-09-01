import { missions } from "../configuration/missions";
import { IMission } from "../interfaces/IMission";

let localMission: Array<IMission> = [...missions];
let length = localMission.length - 1;
// const target = localMission.findIndex((item) => item.id == player.id);
export enum removePos {
   start,
   end,
   index,
}

export class MissionHandler {
   static _instance: MissionHandler;

   private constructor() {}

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(): MissionHandler {
      return this._instance || (this._instance = new this());
   }

   /**
    * Removes one Entry
    * @param  {removePos=removePos.start} pos
    * @param  {} index=0
    */
   public remove(pos: removePos = removePos.start, index = 0) {
      if (length === -1) return console.log("Can't remove Entry");
      console.log("REMOVE");
      localMission.forEach((item) => {
         console.log(item.missionName);
      });
      switch (pos) {
         case removePos.start:
            localMission.shift();
            break;
         case removePos.end:
            localMission.pop();
            break;
         case removePos.index:
            localMission.splice(index, 1);
            break;
      }
   }
   /**
    * Resets the Array to the Default
    */
   public reset() {
      localMission = [...missions];
   }
   /**
    * forEach inside the Array, retrieves callback
    */
   public forEach(cb) {
      localMission.forEach((item) => {
         cb(item);
      });
   }
   /**
    * Gives one entry based on Index, retrieves callback
    * @param  {} index
    */
   public result(index, cb) {
      cb(localMission[index]);
   }
}
