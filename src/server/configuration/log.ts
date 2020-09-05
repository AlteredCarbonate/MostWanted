import * as fs from "fs";
import * as alt from "alt-server";
import * as moment from "moment";

import { LogTypes } from "../enums/LogTypes";
import { ConsoleTypes } from "../enums/ConsoleTypes";

const date = moment().format("YYYY/MM/DD hh:mm:ss a");

export function console(message: any) {
   alt.log(message);
}

/**
 * Send a Player a specific consoleMessage
 */
export function consoleMessage(
   player: alt.Player,
   message: any,
   type: ConsoleTypes = ConsoleTypes.Default
) {
   alt.emitClient(player, "consoleCommand::message", message, type);
}

/**
 * Log with categories into a .log
 */
export function stream(message: any, type: LogTypes = LogTypes.Undefined) {
   if (type == LogTypes.Undefined) {
      fs.appendFile(
         "logs/general.log",
         `[GENERAL] [${date}]: ${message}\n`,
         function (err) {
            if (err) throw err;
         }
      );
   } else {
      fs.appendFile(
         "logs/general.log",
         `[${LogTypes[type]}] [${date}]: ${message}\n`,
         function (err) {
            if (err) throw err;
         }
      );
   }

   switch (type) {
      case LogTypes.Player:
         fs.appendFile("logs/player.log", `[${date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
      case LogTypes.Server:
         fs.appendFile("logs/server.log", `[${date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
      case LogTypes.Command:
         fs.appendFile("logs/command.log", `[${date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
      case LogTypes.Lobby:
         fs.appendFile("logs/lobby.log", `[${date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
   }
}
