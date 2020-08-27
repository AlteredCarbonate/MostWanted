import * as alt from "alt-client";
import { TimerTypes } from "../../enums/TimerTypes";

alt.onServer("system::lobby:localTimer", (type: TimerTypes) => {
   alt.log(`Fired localTimer @ ${type}`);
});
