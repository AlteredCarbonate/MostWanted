import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
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
   public start(player, type: TimerTypes = TimerTypes.Prep): Promise<string> {
      let diff, countDown;
      this._type = type;

      return new Promise((resolve, reject) => {
         if (this._isStarted) {
            logStream("Timer already running", LogTypes.Lobby);
            reject("RunningAlready");
         }

         if (type === TimerTypes.Prep) {
            diff = moment().add(Config.defaultTimer, "ms");
         }
         if (type === TimerTypes.Unprep) {
            diff = moment().add(Config.unprepTimer, "ms");
         }

         alt.emitClient(player, "system::lobby:localTimer", type);
         logStream(`Timer started (${type})`, LogTypes.Lobby);

         this._isStarted = true;
         this._timerInter = alt.setInterval(() => {
            countDown = Math.floor(moment().diff(diff) / 1000);
            if (countDown < 0) {
               // Outputting Timer
               console.log(countDown);
               return;
            } else {
               logStream(`Timer finished (${type})`, LogTypes.Lobby);
               this.reset();

               resolve("Finished");
            }
         }, 1000);
      });
   }
   /**
    * Stops the started Timer, requires to be started first.
    * @returns Promise
    */
   public stop(): Promise<string> {
      return new Promise((resolve, reject) => {
         if (!this._isStarted) {
            logStream("Can't stop, unstarted Timer.", LogTypes.Lobby);
            reject("Unstarted");
         }

         logStream(`Timer stopped (${this._type})`, LogTypes.Lobby);
         this.reset();
         resolve("Stopped");
      });
   }
   public restart(invoke: TimerTypes): void {
      // Needed if conditions change

      if (invoke === TimerTypes.Prep) {
         // INVOKE PREP
      }
      if (invoke === TimerTypes.Unprep) {
         // INVOKE PREP
      }
   }

   private reset(): void {
      this._isStarted = false;
      alt.clearInterval(this._timerInter);
   }
}
