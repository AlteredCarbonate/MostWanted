import * as alt from "alt-client";
import { eventLibary } from "../eventLibary";
import { TimerTypes } from "../../enums/TimerTypes";

alt.onServer(eventLibary.system.lobby.init, () => {
   console.log(`LobbyInit.`);
});

alt.onServer(
   eventLibary.system.lobby.timerStart,
   (type: TimerTypes = TimerTypes.Prep, config: number) => {
      console.log(`TimerStart: ${config} Seconds`);
   }
);

alt.onServer(eventLibary.system.lobby.timerStop, () => {
   console.log(`TimerStop.`);
});
