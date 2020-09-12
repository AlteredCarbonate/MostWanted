import { missions } from "../../../configuration/missions";
import { IMission } from "../../../interfaces/IMission";
import { LogTypes } from "../../../enums/LogTypes";
import { log } from "../../../util";

let _log = new log();

let localMissions: IMission = Object.assign({}, missions);

export enum removePos {
   start,
   end,
   index,
}

export class MissionHandler {
   constructor() {}

   /**
    * Removes one Entry
    */
   public remove(pos: removePos = removePos.start, index = 0) {
      if (length === -1) return _log.console("Can't remove Entry");

      // localMissions.forEach((item) => {
      //    _log.console(item.missionName);
      // });
      // switch (pos) {
      //    case removePos.start:
      //       localMissions.shift();
      //       break;
      //    case removePos.end:
      //       localMissions.pop();
      //       break;
      //    case removePos.index:
      //       localMissions.splice(index, 1);
      //       break;
      // }
   }

   /**
    * forEach inside the Array, retrieves callback
    */
   public forEach(): Promise<any> {
      return new Promise((res, rej) => {
         try {
            for (const mission in localMissions) {
               res(localMissions[mission]);
            }
         } catch (error) {
            _log.stream("MissionHandler forEach => " + error, LogTypes.Server);

            rej(error);
         }
      });
   }
   /**
    * Gives one entry based on Index.
    */
   public result(index = 0) {
      return localMissions[index];
   }

   /**
    * Resets the Array to the Default
    */
   public reset() {
      localMissions = Object.assign({}, missions);
   }
}
