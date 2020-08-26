import * as alt from "alt-server";
import { logStream } from "../configuration/log";
import { LogTypes } from "../enums/LogTypes";
import { Config } from "../configuration/config";

alt.on("playerConnect", (player: alt.Player) => {
   logStream(`${player.name} connected.`, LogTypes.Player);
   handshake(player);
   alt.emitClient(player, "server:startHandshake");
});

function handshake(player: alt.Player) {
   alt.emit("lobby::init", player);
   alt.onClient("client:endHandshake", (player: alt.Player) => {
      logStream(
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
