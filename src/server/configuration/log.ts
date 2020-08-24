import * as fs from "fs";
import * as alt from "alt-server";
import moment = require("moment");
import { LogTypes } from "../enums/LogTypes";

export function log(message: any) {
   alt.log(message);
}
/**
 * @param  {string} message Defines message sent to log
 * @param  {LogTypes=LogTypes.Undefined} type Default Undefined | Types Server; Player;
 */
export function logStream(
   message: string,
   type: LogTypes = LogTypes.Undefined
) {
   const _date = moment().format("YYYY/MM/DD hh:mm:ss a");

   if (type == LogTypes.Undefined) {
      fs.appendFile(
         "logs/general.log",
         `[GENERAL] [${_date}]: ${message}\n`,
         function (err) {
            if (err) throw err;
         }
      );
   } else {
      fs.appendFile(
         "logs/general.log",
         `[${LogTypes[type]}] [${_date}]: ${message}\n`,
         function (err) {
            if (err) throw err;
         }
      );
   }

   switch (type) {
      case LogTypes.Player:
         fs.appendFile("logs/player.log", `[${_date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
      case LogTypes.Server:
         fs.appendFile("logs/server.log", `[${_date}]: ${message}\n`, function (
            err
         ) {
            if (err) throw err;
         });
         break;
      default:
         break;
   }
}
