import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/TimerTypes";
import { logStream } from "../../../configuration/log";
import { LogTypes } from "../../../enums/LogTypes";
import { Config } from "../../../configuration/config";

export class TimerManager {
   static _instance: TimerManager;
   _isStarted: boolean = false;
   _timerInter: number;
   _type: TimerTypes;

   private constructor() {}

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(): TimerManager {
      return this._instance || (this._instance = new this());
   }
   /**
    * Start a timer (Countdown)
    * @param  {TimerTypes=TimerTypes.Prep} type
    * @returns void
    */
   public start(player, type: TimerTypes = TimerTypes.Prep): void {
      let timeDiff;
      if (!this._isStarted) {
         this._type = type;
         this._isStarted = true;

         switch (type) {
            case TimerTypes.Unprep:
               timeDiff = moment().add(Config.unprepTimer, "ms");
               break;

            default:
               timeDiff = moment().add(Config.defaultTimer, "ms");
               break;
         }

         alt.emitClient(player, "system::lobby:localTimer", type);
         logStream(`Timer started (${type})`, LogTypes.Lobby);

         this._timerInter = alt.setInterval(() => {
            var timer = Math.floor(moment().diff(timeDiff) / 1000);
            if (timer < 0) {
               // Outputting Timer
               console.log(timer);
               return;
            } else {
               logStream(`Timer finished (${type})`, LogTypes.Lobby);
               this._isStarted = false;

               alt.clearInterval(this._timerInter);
            }
         }, 1000);
      } else {
         logStream("Timer already running", LogTypes.Lobby);
      }
   }
   /**
    * Stops the started Timer, requires to be started first.
    * @returns void
    */
   public stop(): void {
      if (!this._isStarted)
         return logStream("Can't stop, unstarted Timer.", LogTypes.Lobby);

      alt.clearInterval(this._timerInter);
      logStream(`Timer stopped (${this._type})`, LogTypes.Lobby);
      this.reset();
   }

   private reset(): void {
      this._isStarted = false;
   }
}
