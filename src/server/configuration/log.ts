import * as fs from "fs";
import * as alt from "alt-server";
import moment = require("moment");
import { LogTypes } from "../enums/LogTypes";

export function log(message: any) {
   alt.log(message);
}
/**
 * Log a string with types into a .log
 * @param  {string} message Define the set message
 * @param  {LogTypes=LogTypes.Undefined} type Default Undefined | Types Server; Player;
 */
export function logStream(
   message: string,
   type: LogTypes = LogTypes.Undefined
) {
   const date = moment().format("YYYY/MM/DD hh:mm:ss a");

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
      default:
         break;
   }
}
