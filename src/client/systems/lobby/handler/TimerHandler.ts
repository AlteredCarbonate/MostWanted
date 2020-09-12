import * as alt from "alt-client";
import * as moment from "moment";
import { TimerTypes } from "../../../enums/TimerTypes";
export class TimerHandler {
   constructer() {}
   _timerInt: number;
   _isStarted: boolean = false;
   _type: TimerTypes;

   public start(
      type: TimerTypes = TimerTypes.Prep,
      config: number
   ): Promise<any> {
      return new Promise((res, rej) => {
         let diff, countDown;
         this._type = type;

         if (this._isStarted) return;
         this._isStarted = true;
         diff = moment().add(config, "ms");
         this._timerInt = alt.setInterval(() => {
            countDown = Math.abs(Math.floor(moment().diff(diff) / 1000));
            if (countDown > 0) {
               // Outputting Timer
            } else {
               this.stop();
               res();
            }
         }, 1000);
      });
   }

   public stop() {
      if (this._isStarted) {
         alt.clearInterval(this._timerInt);
         this.reset;
      }
   }

   public reset() {
      this._isStarted = false;
   }
}
