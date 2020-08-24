import * as alt from "alt-server";

alt.onClient("system:lobby::ready", (player: alt.Player) => {
  player.setMeta("lobby::ready", true);
});
