import * as alt from "alt-server";
import { log } from "../configuration/log";

alt.on("playerDisconnect", (player: alt.Player) => {
  log(`${player} disconnected`);
});
