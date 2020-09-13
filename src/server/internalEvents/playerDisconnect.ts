import * as alt from "alt-server";
import * as chalk from "chalk";

import { LogTypes } from "../enums/LogTypes";
import { log } from "../util";
import { events } from "../systems/eventLibary";

let _log = new log();

alt.on("playerDisconnect", async (player: alt.Player) => {
   let data = {
      name: player.name,
      socialID: player.socialId,
      hwid: player.hwidHash,
      ip: player.ip,
   };
   alt.emit(events.system.lobby.leave, data);

   console.log(chalk.redBright(`${player.name} disconnected.`));
   _log.stream(`${player.name} disconnected.`, LogTypes.Player);
});
