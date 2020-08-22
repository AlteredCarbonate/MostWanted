import * as alt from "alt-server";

alt.on("playerConnect", (player: alt.Player) => {
  alt.log(`${player.name} connected`);
  alt.emitClient(player, "server:startHandshake");
});
