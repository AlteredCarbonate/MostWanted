import * as alt from "alt-server";
import { LobbyStatus } from "../../enums/LobbyStatus";
import { TimerTypes } from "../../enums/TimerTypes";
import { PlayerManager } from "./manager/PlayerManager";
import { TimerManager } from "./manager/TimerManager";

let _PlayerManager;
alt.on("system:lobby::init", (player) => {
   player.setMeta("player:lobby::data", { status: LobbyStatus.Init });
   _PlayerManager = PlayerManager.getInstance(player);
});

alt.onClient("system:lobby::ready", (player: alt.Player) => {
   _PlayerManager.ready(player);
});

alt.onClient("system:lobby::join", (player: alt.Player) => {
   _PlayerManager.join(player);
});

alt.on(
   "system:lobby::prepare",
   (player: alt.Player, state: boolean = false) => {
      console.log("system:lobby::prepare");
      let _TimerManager = TimerManager.getInstance();

      if (!state) {
         _TimerManager.start(player, TimerTypes.Unprep);
         state = true;
      }
   }
);
