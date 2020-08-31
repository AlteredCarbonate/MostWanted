import * as alt from "alt-server";
import { LobbyStatus } from "../../enums/systems/LobbyStatus";
// import { TimerTypes } from "../../enums/systems/TimerTypes";
import { PlayerManager } from "./manager/PlayerManager";
// import { TimerManager } from "./manager/TimerManager";

let _PlayerManager: PlayerManager;
let _index: number = 0;

alt.on("system:lobby::init", (player: alt.Player) => {
   _index += 1;
   console.log(`Player Index: ${_index}`);
   player.setMeta("player:lobby::data", {
      index: _index,
      status: LobbyStatus.Init,
   });
   _PlayerManager = PlayerManager.getInstance(player);
});

alt.onClient("system:lobby::ready", () => {
   _PlayerManager.ready();
});

alt.onClient("system:lobby::join", () => {
   _PlayerManager.join();
});

// alt.on(
//    "system:lobby::prepare",
//    (player: alt.Player, state: boolean = false) => {
//       console.log("system:lobby::prepare");
//       let _TimerManager = TimerManager.getInstance(player);

//       if (!state) {
//          _TimerManager.start(TimerTypes.Unprep);
//          state = true;
//       }
//    }
// );
