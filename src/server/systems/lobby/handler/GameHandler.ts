import * as alt from "alt-server";
import { CONFIG } from "../../../configuration/config";

export class GameHandler {
   static _instance: GameHandler;
   playerAmount: number = 0;

   private constructor() {}

   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   public watch() {
      alt.setInterval(() => {
         if (this.playerAmount >= CONFIG.LOBBY.MINPLAYER) {
         }
      }, 1000);
   }

   public modifyAmount(type: "increase" | "decrease") {
      switch (type) {
         case "increase":
            ++this.playerAmount;
            break;
         case "decrease":
            if (this.playerAmount <= 0) {
               return;
            }
            --this.playerAmount;
            break;
      }
   }
}
