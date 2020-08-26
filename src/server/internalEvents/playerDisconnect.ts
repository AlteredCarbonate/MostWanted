import * as alt from "alt-server";
import { logStream } from "../configuration/log";
import { LogTypes } from "../enums/LogTypes";
import { PlayerManager } from "../systems/lobby/internal/manager";

alt.on("playerDisconnect", (player: alt.Player) => {
   logStream(`${player} disconnected.`, LogTypes.Player);
   PlayerManager.leave(player);
});
