import * as alt from "alt-server";
import { events } from "../eventLibary";
import { LobbyHandler } from "./handler/LobbyHandler";

let handler = new LobbyHandler();
alt.on(events.system.lobby.timerStop, () => {});

alt.on(events.system.lobby.leave, (player: alt.Player) => {
   let _player = player;
   handler.leave(_player);
});

alt.on(events.system.lobby.join, (player: alt.Player) => {
   handler.join(player);
});
