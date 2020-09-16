import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { events } from "../../eventLibary";
import { CONFIG } from "../../../configuration/CONFIG";
import { GameHandler } from "./GameHandler";

export type stopTypes = "success" | "error";

export class HeartBeat {
   static _instance: HeartBeat;

   _timerInt: number;
   _isStarted: boolean = false;
   _type: TimerTypes;
   _game: GameHandler;

   private constructor() {
      HeartBeat._instance = this;
      this._game = GameHandler.getInstance();
   }

   public static getInstance() {
      if (!this._instance) HeartBeat._instance = new HeartBeat();
      return HeartBeat._instance;
   }

   // public static getInstance() {
   //    console.log("Called Instance");
   //    return this._instance ?? (this._instance = new this());
   // }

   public start(type: TimerTypes = TimerTypes.Prep): Promise<any> {
      return new Promise((res, rej) => {
         let diff, countDown;
         this._type = type;

         if (this._isStarted) return;
         this._isStarted = true;

         switch (type) {
            case TimerTypes.Prep:
               diff = moment().add(CONFIG.LOBBY.PREPTIME, "ms");
               break;
            case TimerTypes.Unprep:
               diff = moment().add(CONFIG.LOBBY.UNPREPTIME, "ms");
               break;
         }
         alt.emit(events.system.lobby.timerStart);

         this._timerInt = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));

            if (countDown > 0) {
               // Outputting Timer
               console.log(countDown);
            } else {
               this.stop("success");

               res();
            }
         }, 1000);

         this._game.heartBeat();
      });
   }

   public init() {
      return new Promise((res, rej) => {
         let diff, countDown;
         diff = moment().add(CONFIG.LOBBY.INITTIME, "ms");

         this._timerInt = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));

            if (countDown > 0) {
               // Outputting Timer
            } else {
               this.stop("success");

               alt.emit(events.system.lobby.timerStop, "success");
               res();
            }
         }, 1000);
      });
   }

   public stop(type: stopTypes) {
      if (this._isStarted) {
         alt.clearInterval(this._timerInt);
         alt.emit(events.system.lobby.timerStop, type);
         switch (type) {
            case "success":
               this.init();
               break;

            case "error":
               break;
         }

         this.reset();
      }
   }

   public reset() {
      this._isStarted = false;
   }
}
