import * as alt from "alt-server";
import { lobby } from "./internal/globalLobby";
import { Manager } from "./internal/manager";

alt.onClient("system:lobby::ready", (player: alt.Player) => {
   Manager.ready(player);
   console.log(lobby);
});

alt.onClient("system:lobby::join", (player: alt.Player) => {
   Manager.join(player);
   console.log(lobby);
});
