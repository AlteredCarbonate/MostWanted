// const blips = {};
// const blip = { identifier:"veh", label:"vendor", position:null, sprite:null, color:null, scale:null, shortRange:null };

// blips[blip.identifier] = blip;

import { util } from "../../../util";
import { missionModel } from "../../../database/models";
import * as chalk from "chalk";

const _util = new util();

export class MissionHandler {
   missionAmount: number = -1;
   dataUpToDate: boolean = false;

   static _instance: MissionHandler;
   private constructor() {}

   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   public updateData() {
      console.log(chalk.greenBright("[DATABASE] Updating Mission Data"));

      missionModel.find().then((res) => {
         if (res.length >= 1) {
            this.missionAmount = res.length - 1;
            this.dataUpToDate = true;
         }
      });
   }

   /**
    * Return Random Mission data
    * Requires AWAIT
    */
   public requestOne() {
      if (!this.dataUpToDate) {
         console.log(
            chalk.redBright("[DATABASE]: Data not Updated, may be wrong!")
         );
      }

      if (this.missionAmount <= -1) {
         return console.log(
            chalk.redBright("Unable to request UNDEFINED Data.")
         );
      }

      return missionModel.findOne({
         //  index: 0,
         index: _util.randomInt(this.missionAmount),
      });
   }
}
