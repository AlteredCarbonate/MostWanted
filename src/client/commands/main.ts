import * as alt from "alt-client";
import { ConsoleTypes } from "../enums/ConsoleTypes";

alt.on("consoleCommand", (player: alt.Player, args: string[]) => {
   alt.emitServer("consoleCommand::command", player, args);
});

alt.onServer(
   "consoleCommand::message",
   (message: string, type: ConsoleTypes = ConsoleTypes.Default) => {
      switch (type) {
         case ConsoleTypes.Default:
            alt.log(message);
            break;
         case ConsoleTypes.Warning:
            alt.logWarning(message);
            break;
         case ConsoleTypes.Error:
            alt.logError(message);
            break;
         default:
            break;
      }
   }
);
