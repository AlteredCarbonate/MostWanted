import * as alt from "alt-server";
import { CONFIG } from "../../../configuration/config";
import * as chalk from "chalk";
import { MissionHandler } from "./MissionHandler";
import { events } from "../../eventLibary";

type actions = "plus" | "minus";

export class GameHandler {
   static _instance: GameHandler;
   _mission: MissionHandler;

   playerAmount: number = 0;
   // instanced: boolean = false;
   isBeating: boolean = false;

   private constructor() {
      this._mission = MissionHandler.getInstance();
   }

   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   public heartBeat() {
      let init: boolean = false;
      let beatInt: any = 0;
      if (this.playerAmount >= CONFIG.LOBBY.MINPLAYER) {
         if (!init) {
            init = true;
            beatInt = alt.setInterval(() => {
               console.log(chalk.greenBright("MinPlayer Reached"));
               alt.emit(events.system.lobby.init);
            }, CONFIG.HEARTBEAT);
         }
      } else {
         console.log(chalk.redBright("MinPlayer Unreached"));
         alt.clearInterval(beatInt);
         init = false;
      }
   }

   public beat(state: boolean) {
      this.isBeating = state;
   }

   public players(type: actions) {
      switch (type) {
         case "plus":
            ++this.playerAmount;
            break;
         case "minus":
            if (this.playerAmount <= 0) {
               return;
            }
            --this.playerAmount;
            break;
      }
      console.log(`playerAmount: ${this.playerAmount}`);
      this.heartBeat();
   }
}
