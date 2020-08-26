import * as alt from "alt-server";
import { lobby } from "./internal/globalLobby";
import { PlayerManager } from "./internal/manager";

alt.onClient("system:lobby::ready", (player: alt.Player) => {
   PlayerManager.ready(player);
   console.log(lobby);
});

alt.onClient("system:lobby::join", (player: alt.Player) => {
   PlayerManager.join(player);
   console.log(lobby);
});
