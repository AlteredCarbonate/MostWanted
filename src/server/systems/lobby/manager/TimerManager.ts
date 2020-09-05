import * as alt from "alt-server";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import * as log from "../../../configuration/log";
import { LogTypes } from "../../../enums/LogTypes";
import { Config } from "../../../configuration/config";
import { EventTypes } from "../../../enums/systems/EventTypes";

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
    */
   public start(type: TimerTypes = TimerTypes.Prep): Promise<any> {
      return new Promise((res, rej) => {
         let diff, countDown;
         this._type = type;

         if (this._isStarted) {
            log.stream("Timer already running", LogTypes.Lobby);
            res("Timer already running");
         } else {
            log.stream(`Timer started (${type})`, LogTypes.Lobby);
            if (type === TimerTypes.Prep) {
               diff = moment().add(Config.defaultTimer, "ms");
            }
            if (type === TimerTypes.Unprep) {
               diff = moment().add(Config.unprepTimer, "ms");
            }

            this._isStarted = true;
            this._timerInter = alt.setInterval(() => {
               countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
               if (countDown > 0) {
                  // Outputting Timer
                  console.log(countDown);
                  if (countDown == 5) {
                     this.emitStageing();
                  }
               } else {
                  log.stream(`Timer finished (${type})`, LogTypes.Lobby);
                  this.reset();

                  res(type);
               }
            }, 1000);
         }
      });
   }
   /**
    * Stops the started Timer
    */
   public stop() {
      if (!this._isStarted) {
         log.stream("Can't stop unstarted Timer.", LogTypes.Lobby);
      }

      log.stream(`Timer stopped (${this._type})`, LogTypes.Lobby);
      this.reset();
   }
   /**
    * Restarts Timer, starts a new one with invoke
    */
   public restart(invoke: TimerTypes): void {
      this.reset();
      this.start(invoke);
   }

   private reset(): void {
      this._isStarted = false;
      alt.clearInterval(this._timerInter);
   }

   private emitStageing() {
      log.stream("Reached 5 Seconds - Stageing Lobby", LogTypes.Lobby);
      alt.emit(EventTypes.systemLobbyStageing, this._player);
      alt.emitClient(this._player, EventTypes.systemLobbyStageing);
   }
}
