import * as alt from "alt-server";
import { CONFIG } from "../../../configuration/config";
import * as chalk from "chalk";

type actions = "plus" | "minus";

export class GameHandler {
   static _instance: GameHandler;
   playerAmount: number = 0;
   // instanced: boolean = false;
   isBeating: boolean = false;

   private constructor() {}

   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   public heartBeat() {
      if (this.playerAmount >= CONFIG.LOBBY.MINPLAYER) {
         alt.setInterval(() => {
            console.log(chalk.greenBright("MinPlayer Reached"));
         }, CONFIG.HEARTBEAT);
      } else {
         console.log(chalk.redBright("MinPlayer Unreached"));
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
