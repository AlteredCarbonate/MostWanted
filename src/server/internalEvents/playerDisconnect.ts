import * as alt from "alt-server";

alt.on("playerDisconnect", (player: alt.Player) => {
  alt.log(`${player.name} disconnected`);
});
