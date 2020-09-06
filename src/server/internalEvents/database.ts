import * as alt from "alt-server";
import { PlayerHandler } from "../database/handler/PlayerHandler";
import * as chalk from "chalk";

let _playerDB: PlayerHandler = new PlayerHandler();

alt.on("system:database::join", async (player: alt.Player) => {
   _playerDB.joinLobby(player).then(() => {
      console.log(chalk.greenBright("Joined Go fuck yourself"));
   });
});

alt.on("system:database::leave", async (player: alt.Player) => {
   _playerDB.leaveLobby(player).then(() => {
      console.log(chalk.redBright("Left Go fuck yourself"));
   });
});
