import * as alt from "alt-server";
import * as chalk from "chalk";

import { LogTypes } from "../enums/LogTypes";
import { log } from "../util";
let _log = new log();

alt.on("playerDisconnect", (player: alt.Player) => {
   // let instancePlayer = player;
   alt.emit("system:database::leave", player);

   console.log(chalk.redBright(`${player.name} disconnected.`));
   _log.stream(`${player.name} disconnected.`, LogTypes.Player);
});
