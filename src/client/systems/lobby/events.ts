import * as alt from "alt-client";
import { TimerTypes } from "../../enums/TimerTypes";

alt.onServer("system::lobby:localTimer", (type: TimerTypes) => {
   alt.log(`Fired localTimer @ ${type}`);
});

alt.onServer("system:lobby::init", () => {
   alt.log("system:lobby::init");
});

alt.onServer("system:lobby::prepare", () => {
   alt.log(`system:lobby::prepare`);
});

alt.onServer("system:game::start", (cooldown?: number) => {
   alt.log(`system:game::start Cooldown: ${cooldown}`);
});

alt.onServer("system:game::stop", () => {
   alt.log(`system:game::stop`);
});
