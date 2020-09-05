import * as alt from "alt-server";
import { LogTypes } from "../enums/LogTypes";
import { log } from "../util";
let _log = new log();

alt.on("playerDisconnect", (player: alt.Player) => {
   _log.stream(`${player} disconnected.`, LogTypes.Player);
});
