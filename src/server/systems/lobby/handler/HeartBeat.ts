import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { events } from "../../eventLibary";
import { CONFIG } from "../../../configuration/CONFIG";
import { GameHandler } from "./GameHandler";

export type stopTypes = "success" | "error";

export class HeartBeat {
   static _instance: HeartBeat;

   _timerInit: number;
   _timerStart: number;
   _timerStarted: boolean = false;
   _timerInited: boolean = false;
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

   public start(type: TimerTypes = TimerTypes.Prep): Promise<any> {
      return new Promise((res, rej) => {
         let diff, countDown;
         this._type = type;

         if (this._timerStarted) return;
         this._timerStarted = true;

         switch (type) {
            case TimerTypes.Prep:
               diff = moment().add(CONFIG.LOBBY.PREPTIME, "ms");
               break;
            case TimerTypes.Unprep:
               diff = moment().add(CONFIG.LOBBY.UNPREPTIME, "ms");
               break;
         }

         alt.emit(events.system.lobby.timerStart);
         console.log("Normal Timer");
         this._timerStart = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
            if (countDown > 0) {
               // Outputting Timer
               console.log(countDown);
               if (countDown == 3) {
                  alt.emit(events.system.game.setReady);
                  console.log("TEMP INIT");
               }
            } else {
               this.init();
               alt.clearInterval(this._timerStart);
               this.reset();

               res();
            }
         }, 1000);

         this._game.heartBeat();
      });
   }

   public init() {
      return new Promise((res, rej) => {
         let diff, countDown;

         if (this._timerInited) return;
         this._timerInited = true;

         diff = moment().add(CONFIG.LOBBY.INITTIME, "ms");

         console.log("Init Timer");
         this._timerInit = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
            if (countDown > 0) {
               // Outputting Timer
               console.log(countDown);
            } else {
               alt.clearInterval(this._timerInit);
               console.log("Init Stop");
               this.reset();

               alt.emit(events.system.lobby.timerStop, "success");
               res();
            }
         }, 1000);
      });
   }

   public reset() {
      this._timerStarted = false;
      this._timerInited = false;
   }
}
