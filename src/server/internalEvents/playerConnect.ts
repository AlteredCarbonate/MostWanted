import * as alt from "alt-server";
import { LogTypes } from "../enums/LogTypes";
import { Config } from "../configuration/config";
import { log } from "../util";
import { playerModel } from "../database/models";

let _log = new log();

alt.on("playerConnect", (player: alt.Player) => {
   _log.stream(`${player.name} connected.`, LogTypes.Player);

   handshake(player);
   savePlayer(player);
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

function savePlayer(player: alt.Player) {
   const data = new playerModel({
      userName: player.name,
      socialID: player.socialId,
      rank: 0,
      accountCreation: Date.now(),
   });
   data.save();
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
