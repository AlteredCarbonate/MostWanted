import * as alt from "alt-server";

alt.onClient("client:endHandshake", (player: alt.Player) => {
  alt.log(`Handshake complete, ${player.name} answered successful.`);
  player.pos = new alt.Vector3(1978, 3111, 46);
  player.model = "g_f_importexport_01";
});
