import * as alt from "alt-server";
import { PlayerHandler } from "./newHandler";
import { ILobby } from "../interface/ILobby";
import { lobbyModel } from "../models";
import * as chalk from "chalk";

export class LobbyHandler {
   _playerDB: PlayerHandler;
   constructor() {
      this._playerDB = new PlayerHandler();
   }

   public async request(player: alt.Player) {
      let _playerAccount = await this._playerDB.request(player);

      if (_playerAccount !== null) {
         return lobbyModel.findOne({ userName: _playerAccount._id });
      }
      return null;
   }

   public async join(player: alt.Player) {
      let _playerAccount = await this._playerDB.request(player);
      let _lobby = await this.request(player);

      if (_lobby === null) {
         const data: ILobby = {
            userName: _playerAccount._id,
         };

         lobbyModel.insertMany([data]);
         console.log(chalk.greenBright(`${player.name} joined the Lobby.`));
      } else {
         console.log(chalk.redBright(`${player.name} already in the Lobby.`));
      }
   }

   public async leave(player: alt.Player) {
      let _playerAccount = await this._playerDB.request(player);
      let _lobby = await this.request(player);

      if (_lobby !== null) {
         await lobbyModel.deleteOne({ userName: _playerAccount._id });

         console.log(chalk.greenBright(`${player.name} left Lobby.`));
      } else {
         console.log(chalk.redBright(`${player.name} not in the Lobby.`));
      }
   }
}
