import * as alt from "alt-server";
import { events } from "../eventLibary";
import { LobbyHandler } from "./handler/LobbyHandler";
import { IInstance } from "../../interfaces/IInstance";
// import { HeartBeat } from "./handler/HeartBeat";
import * as chalk from "chalk";
// import { TimerTypes } from "../../enums/systems/TimerTypes";

let _lobbyHandler = new LobbyHandler();
// let _heartBeat = HeartBeat.getInstance();

alt.on(events.system.lobby.init, () => {
   // Init Game with 5 Sec Cooldown
});

alt.on(events.system.lobby.timerStart, () => {
   // Start TImer
   alt.emitClient(null, events.system.lobby.timerStart);
});

alt.on(events.system.lobby.timerStop, (type: "success" | "error") => {
   if (!type || type == undefined)
      return console.log(
         chalk.redBright("Can't stop Timer with type UNDEFINED")
      );
   alt.emitClient(null, events.system.lobby.timerStop, type);

   switch (type) {
      case "success":
         break;
      case "error":
         break;
   }
});

alt.on(events.system.lobby.join, (instance: IInstance) => {
   _lobbyHandler.join(instance);
});

alt.on(events.system.lobby.leave, (instance: IInstance) => {
   _lobbyHandler.leave(instance);
});
