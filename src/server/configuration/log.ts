import * as fs from "fs";
import * as alt from "alt-server";
import moment = require("moment");

export function log(message: string) {
  alt.log(message);
}

export function logStream(message: string, type?: string) {
  const _date = moment().format("YYYY/MM/DD hh:mm:ss a");

  if (!type) {
    fs.appendFile(
      "logs/general.log",
      `[GENERAL] [${_date}]: ${message}\n`,
      function (err) {
        if (err) throw err;
        alt.log("Log Saved!");
      }
    );
  } else {
    fs.appendFile(
      "logs/general.log",
      `[${type.toUpperCase}] [${_date}]: ${message}\n`,
      function (err) {
        if (err) throw err;
        alt.log("Log Saved!");
      }
    );
  }

  switch (type) {
    case "player":
      fs.appendFile("logs/player.log", `[${_date}]: ${message}\n`, function (
        err
      ) {
        if (err) throw err;
        alt.log("Log Saved!");
      });
      break;
    case "server":
      fs.appendFile("logs/server.log", `[${_date}]: ${message}\n`, function (
        err
      ) {
        if (err) throw err;
        alt.log("Log Saved!");
      });
      break;
    default:
      break;
  }
}
