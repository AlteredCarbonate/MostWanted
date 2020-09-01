import * as alt from "alt-client";
import { TimerTypes } from "../../enums/TimerTypes";
import { EventTypes } from "../../enums/systems/EventTypes";
import { IMission } from "../../interfaces/IMission";

alt.onServer(EventTypes.systemLobbylocalTimer, (type: TimerTypes) => {
   alt.log(`Fired localTimer @ ${type}`);
});

alt.onServer(EventTypes.systemLobbyInit, () => {
   alt.log("system:lobby::init");
});

alt.onServer(EventTypes.systemLobbyPrepare, () => {
   alt.log(`system:lobby::prepare`);
});

alt.onServer(EventTypes.systemGameStart, (cooldown: number, item: IMission) => {
   alt.log(`system:game::start Cooldown: ${cooldown}`);
   alt.log(`Mission Parameter: ${item.missionName}`);
});

alt.onServer(EventTypes.systemGameStop, () => {
   alt.log(`system:game::stop`);
});
