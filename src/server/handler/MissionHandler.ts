import * as log from "../configuration/log";

import { missions } from "../configuration/missions";
import { IMission } from "../interfaces/IMission";
import { LogTypes } from "../enums/LogTypes";

let localMission: Array<IMission> = [...missions];
let length = localMission.length - 1;
// const target = localMission.findIndex((item) => item.id == player.id);
export enum removePos {
   start,
   end,
   index,
}

export class MissionHandler {
   constructor() {}

   /**
    * Removes one Entry
    * @param  {removePos=removePos.start} pos
    * @param  {} index=0
    */
   public remove(pos: removePos = removePos.start, index = 0) {
      if (length === -1) return console.log("Can't remove Entry");
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
    * forEach inside the Array, retrieves callback
    */
   public forEach(): Promise<any> {
      return new Promise((res, rej) => {
         try {
            localMission.forEach((item) => {
               res(item);
            });
         } catch (error) {
            log.stream("MissionHandler forEach => " + error, LogTypes.Server);

            rej(error);
         }
      });
   }
   /**
    * Gives one entry based on Index, retrieves callback
    * @param  {} index
    */
   public result(index = 0) {
      return localMission[index];
   }

   /**
    * Resets the Array to the Default
    */
   public reset() {
      localMission = [...missions];
   }
}
