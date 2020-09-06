import * as alt from "alt-server";

import { LogTypes } from "../enums/LogTypes";
import { Config } from "../configuration/config";
import { log } from "../util";
import { PlayerHandler } from "../database/handler/PlayerHandler";

let _log = new log();
let _playerDB: PlayerHandler;

alt.on("playerConnect", async (player: alt.Player) => {
   _playerDB = new PlayerHandler(player);
   _log.stream(`${player.name} connected.`, LogTypes.Player);

   handshake(player);
   _playerDB.createAccount(player.name);
   let data = await _playerDB.requestAccount(player.name);
   console.log(data);

   alt.emitClient(player, "server:startHandshake");
});

function handshake(player: alt.Player) {
   alt.emit("system:lobby::init", player);

   alt.onClient("client:endHandshake", (player: alt.Player) => {
      _log.stream(
         `${player.name} Handshake complete, answered successful.`,
         LogTypes.Player
      );
      player.pos = new alt.Vector3(
         Config.defaultSpawnPoint.x,
         Config.defaultSpawnPoint.y,
         Config.defaultSpawnPoint.z
      );
      player.model = "g_f_importexport_01";
      player.health = 200;
   });
}

// alt.on(
//    "explosion",
//    (
//       source: alt.Entity,
//       type: number,
//       pos: alt.Vector3,
//       id: number,
//       target: alt.Entity
//    ) => {
//       console.log(
//          `source:${source} source.type ${source.type} type:${type} target: ${target}`
//       );
//       // return false; // Cancels Event
//       if (target instanceof alt.Vehicle) {
//          console.log("An Vehicle explode, removing");

//          target.destroy();
//       }
//    }
// );
