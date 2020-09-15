import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { events } from "../../eventLibary";
import { CONFIG } from "../../../CONFIGuration/CONFIG";
import { GameHandler } from "./GameHandler";

export class HeartBeat {
   static _instance: HeartBeat;

   _timerInt: number;
   _isStarted: boolean = false;
   _type: TimerTypes;
   _game: GameHandler;

   private constructor() {
      this._game = GameHandler.getInstance();
   }

   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

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

         this._timerInt = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
            alt.emitClient(null, events.system.lobby.timerStart);

            if (countDown > 0) {
               // Outputting Timer
            } else {
               this.reset();

               alt.emitClient(null, events.system.lobby.timerStop);
               alt.emit(events.system.lobby.timerStop);
               res();
            }
         }, 1000);

         this._game.heartBeat();
      });
   }
   public startInit() {
      return new Promise((res, rej) => {
         let diff, countDown;
         diff = moment().add(CONFIG.LOBBY.INITTIME, "ms");

         this._timerInt = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
            alt.emitClient(null, events.system.lobby.timerStart);

            if (countDown > 0) {
               // Outputting Timer
            } else {
               this.reset();

               alt.emitClient(null, events.system.lobby.timerStop);
               alt.emit(events.system.lobby.timerStop);
               res();
            }
         }, 1000);
      });
   }

   public stop() {
      if (this._isStarted) {
         alt.clearInterval(this._timerInt);
         this.reset();
      }
   }

   public reset() {
      this._isStarted = false;
   }
}
