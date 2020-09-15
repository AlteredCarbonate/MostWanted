import * as alt from "alt-server";
import * as chalk from "chalk";
import { CONFIG } from "../../../configuration/config";
import { MissionHandler } from "./MissionHandler";
import { events } from "../../eventLibary";
import { HeartBeat } from "./HeartBeat";

type actions = "plus" | "minus";

export class GameHandler {
   static _instance: GameHandler;

   _mission: MissionHandler;
   _heartBeat: HeartBeat;

   playerAmount: number = 0;
   isBeating: boolean = false;

   private constructor() {
      GameHandler._instance = this;
      this._mission = MissionHandler.getInstance();
      this._heartBeat = HeartBeat.getInstance();
   }

   public static getInstance() {
      if (!this._instance) GameHandler._instance = new GameHandler();
      return GameHandler._instance;
   }

   public heartBeat() {
      let init: boolean = false;
      let beatInt: any = 0;
      if (this.playerAmount >= CONFIG.LOBBY.MINPLAYER) {
         if (!init) {
            init = true;
            alt.emit(events.system.lobby.timerStart);
            beatInt = alt.setInterval(() => {
               console.log(chalk.greenBright("MinPlayer Reached"));
            }, CONFIG.HEARTBEAT);
         }
      } else {
         console.log(chalk.redBright("MinPlayer Unreached"));
         if (init) {
            alt.clearInterval(beatInt);
         }
         alt.emit(events.system.lobby.timerStop, "error");
         init = false;
      }
   }

   public beat(state: boolean) {
      this.isBeating = state;
   }

   public appendData(type: actions) {
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

   // GAME
   public start() {}

   public stop() {}
}
