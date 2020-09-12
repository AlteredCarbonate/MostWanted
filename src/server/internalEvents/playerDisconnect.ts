import * as alt from "alt-server";
import * as chalk from "chalk";

import { LogTypes } from "../enums/LogTypes";
import { log } from "../util";
import { events } from "../systems/eventLibary";

let _log = new log();

alt.on("playerDisconnect", async (player: alt.Player) => {
   alt.emit(events.system.lobby.leave, player);

   console.log(chalk.redBright(`${player.name} disconnected.`));
   _log.stream(`${player.name} disconnected.`, LogTypes.Player);
});
