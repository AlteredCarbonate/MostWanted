import * as alt from "alt-server";
import { events } from "../eventLibary";
import { LobbyHandler } from "./handler/LobbyHandler";
import { IInstance } from "../../interfaces/IInstance";
import { HeartBeat } from "./handler/HeartBeat";
// import { TimerTypes } from "../../enums/systems/TimerTypes";

let _lobbyHandler = new LobbyHandler();
let _heartBeat = HeartBeat.getInstance();

alt.on(events.system.lobby.init, () => {
   // Init Game with 5 Sec Cooldown
});

alt.on(events.system.lobby.timerStart, () => {
   // Start TImer
   _heartBeat.start();

   alt.emitClient(null, events.system.lobby.timerStart);
});

alt.on(events.system.lobby.timerStop, (type: "success" | "error") => {
   _heartBeat.stop(type);
});

alt.on(events.system.lobby.join, (instance: IInstance) => {
   _lobbyHandler.join(instance);
});

alt.on(events.system.lobby.leave, (instance: IInstance) => {
   _lobbyHandler.leave(instance);
});
