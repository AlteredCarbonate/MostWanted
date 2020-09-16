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
   beatInt: any;

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
      if (this.playerAmount >= CONFIG.LOBBY.MINPLAYER) {
         if (!this.isBeating) {
            this.isBeating = true;
            alt.emit(events.system.lobby.timerStart);
            this.heart();
         }
      } else {
         console.log(chalk.redBright("MinPlayer Unreached"));
         if (this.isBeating) {
            alt.clearInterval(this.beatInt);
         }
         alt.emit(events.system.lobby.timerStop, "error");
         this.isBeating = false;
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

   // PRIVATE
   private heart() {
      // MinPlayer Reached
      this.isBeating = true;
      this.beatInt = alt.setInterval(() => {
         // CONTENT
      }, CONFIG.HEARTBEAT);
   }
}
