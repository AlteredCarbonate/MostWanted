import * as alt from "alt-client";
import { events } from "../eventLibary";
import { TimerTypes } from "../../enums/TimerTypes";

alt.onServer(events.system.lobby.init, () => {
   console.log(`LobbyInit.`);
});

alt.onServer(
   events.system.lobby.timerStart,
   (type: TimerTypes = TimerTypes.Prep, config: number) => {
      console.log(`TimerStart: ${config} Seconds`);
   }
);

alt.onServer(events.system.lobby.timerStop, () => {
   console.log(`TimerStop.`);
});
