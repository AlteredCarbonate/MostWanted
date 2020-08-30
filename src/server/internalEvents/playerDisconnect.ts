import * as alt from "alt-server";
import * as log from "../configuration/log";
import { LogTypes } from "../enums/LogTypes";
// import { PlayerManager } from "../systems/lobby/internal/manager";

alt.on("playerDisconnect", (player: alt.Player) => {
   log.stream(`${player} disconnected.`, LogTypes.Player);
   // PlayerManager.leave(player);
});
