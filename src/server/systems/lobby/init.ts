import * as alt from "alt-server";
import { LobbyStatus } from "../../enums/systems/LobbyStatus";
import { PlayerManager } from "./manager/PlayerManager";

let _PlayerManager: PlayerManager;

alt.on("system:lobby::init", (player: alt.Player) => {
   player.setMeta("player:lobby::data", {
      status: LobbyStatus.Init,
   });
   _PlayerManager = new PlayerManager(player);
});

alt.onClient("system:lobby::ready", () => {
   _PlayerManager.ready();
});

alt.onClient("system:lobby::join", () => {
   _PlayerManager.join();
});
