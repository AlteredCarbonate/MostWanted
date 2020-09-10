import * as alt from "alt-server";
import * as moment from "moment";
import * as fs from "fs";

import { LogTypes } from "./enums/LogTypes";
import { ConsoleTypes } from "./enums/ConsoleTypes";

export class util {
   constructor() {}

   public randomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max));
   }
}

export class log {
   date: string;

   constructor() {
      this.date = moment().format("YYYY/MM/DD hh:mm:ss a");
   }

   public console(message: any) {
      alt.log(message);
   }

   public consoleMessage(
      player: alt.Player,
      message: any,
      type: ConsoleTypes = ConsoleTypes.Default
   ) {
      alt.emitClient(player, "consoleCommand::message", message, type);
   }

   public async stream(message: any, type: LogTypes = LogTypes.General) {
      let _rootDir = "logs/";
      let _dir = _rootDir + `${type}.log`;
      return new Promise((res, rej) => {
         if (type === LogTypes.General) {
            fs.appendFile(
               _dir,
               `[${type.toUpperCase}]: [${this.date}]: ${message}\n`,
               (err) => {
                  if (err) {
                     console.log(err);
                     rej(err);
                  }
                  res();
               }
            );
         } else {
            fs.appendFile(_dir, `[${this.date}]: ${message}\n`, (err) => {
               if (err) {
                  console.log(err);
                  rej(err);
               }
               res();
            });
         }
      });
   }
}
