import * as alt from "alt-server";
import { events } from "../eventLibary";
import { LobbyHandler } from "./handler/LobbyHandler";
import { IInstance } from "../../interfaces/IInstance";
import { HeartBeat } from "./handler/HeartBeat";

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

alt.on(events.system.game.setReady, () => {
   alt.emitClient(null, events.system.game.setReady);
});

alt.on(
   events.system.game.setState,
   (invkPlayer: alt.Player, key: any, value: any) => {
      invkPlayer.setMeta(key, { state: value });
   }
);

alt.on(events.system.lobby.timerStop, (type: "success" | "error") => {});

alt.on(events.system.lobby.join, (instance: IInstance) => {
   _lobbyHandler.join(instance);
});

alt.on(events.system.lobby.leave, (instance: IInstance) => {
   _lobbyHandler.leave(instance);
});
