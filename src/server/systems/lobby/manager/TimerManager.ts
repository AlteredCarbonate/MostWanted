import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import * as log from "../../../configuration/log";
import { LogTypes } from "../../../enums/LogTypes";
import { Config } from "../../../configuration/config";
import { TimerCB } from "../../../enums/systems/TimerCB";

export class TimerManager {
   static _instance: TimerManager;
   _player: alt.Player;
   _isStarted: boolean = false;
   _timerInter: number;
   _type: TimerTypes;

   private constructor(player: alt.Player) {
      this._player = player;
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player): TimerManager {
      return this._instance || (this._instance = new this(player));
   }
   /**
    * Start the timer (Countdown)
    * @param  {TimerTypes=TimerTypes.Prep} type
    * @returns Promise
    */
   public start(type: TimerTypes = TimerTypes.Prep): Promise<string> {
      let diff, countDown;
      this._type = type;

      return new Promise((resolve, reject) => {
         if (this._isStarted) {
            log.stream("Timer already running", LogTypes.Lobby);
            reject("RunningAlready");
         }

         if (type === TimerTypes.Prep) {
            diff = moment().add(Config.defaultTimer, "ms");
         }
         if (type === TimerTypes.Unprep) {
            diff = moment().add(Config.unprepTimer, "ms");
         }

         alt.emitClient(this._player, "system:lobby::localTimer", type);
         log.stream(`Timer started (${type})`, LogTypes.Lobby);

         this._isStarted = true;
         this._timerInter = alt.setInterval(() => {
            countDown = Math.floor(moment().diff(diff) / 1000);
            if (countDown < 0) {
               // Outputting Timer
               console.log(countDown);
               return;
            } else {
               log.stream(`Timer finished (${type})`, LogTypes.Lobby);
               this.reset();

               resolve(TimerCB.Finished);
            }
         }, 1000);
      });
   }
   /**
    * Stops the started Timer
    * @returns Promise
    */
   public stop(): Promise<string> {
      return new Promise((resolve, reject) => {
         if (!this._isStarted) {
            log.stream("Can't stop, unstarted Timer.", LogTypes.Lobby);
            reject(TimerCB.Unstarted);
         }

         log.stream(`Timer stopped (${this._type})`, LogTypes.Lobby);
         this.reset();
         resolve(TimerCB.Stopped);
      });
   }
   /**
    * Restarts Timer, starts a new one with invoke
    * @param  {TimerTypes} invoke
    * @returns void
    */
   public restart(invoke: TimerTypes): void {
      this.reset();
      this.start(invoke);
   }

   private reset(): void {
      this._isStarted = false;
      alt.clearInterval(this._timerInter);
   }
}
