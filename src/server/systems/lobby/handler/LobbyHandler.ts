import * as chalk from "chalk";

import { PlayerHandler } from "./PlayerHandler";
import { ILobby } from "../../../database/interface/ILobby";
import { lobbyModel } from "../../../database/models";
import { IInstance } from "../../../interfaces/IInstance";
import { GameHandler } from "./GameHandler";

export class LobbyHandler {
   _playerDB: PlayerHandler;
   _game: GameHandler;

   constructor() {
      this._playerDB = new PlayerHandler();
      this._game = GameHandler.getInstance();
   }

   public updateData() {
      console.log(chalk.greenBright("[DATABASE]: Clearing Lobby Data"));
      lobbyModel.collection.deleteMany({});
   }

   public async request(instance: IInstance, all: boolean = false) {
      let _playerAccount = await this._playerDB.request(instance);

      if (_playerAccount !== null) {
         if (!all) {
            return lobbyModel.findOne({ userName: _playerAccount._id });
         } else {
            return lobbyModel.find({});
         }
      }
      return null;
   }

   public async join(instance: IInstance) {
      let [_playerAccount, _lobby] = await Promise.all([
         this._playerDB.request(instance),
         this.request(instance),
      ]);
      // let _playerAccount = await this._playerDB.request(target);
      // let _lobby = await this.request(player);

      if (_lobby === null) {
         const data: ILobby = {
            playerReference: _playerAccount._id,
         };

         this.appendData(data);
         console.log(chalk.greenBright(`${instance.name} joined the Lobby.`));

         this._game.modifyAmount("increase");
      } else {
         console.log(chalk.redBright(`${instance.name} already in the Lobby.`));
      }
   }

   public async leave(instance: IInstance) {
      let _playerAccount = await this._playerDB.request(instance);
      await lobbyModel.deleteOne({ playerReference: _playerAccount._id });

      console.log(chalk.redBright(`${instance.name} left Lobby.`));
   }

   public async appendData(data: ILobby) {
      console.log(chalk.greenBright("Appending data..."));
      if (!data) {
         return console.log(
            chalk.redBright("[LobbyHandler]: Can't append Data of Undefined.")
         );
      }
      await lobbyModel.insertMany([data]);
   }
}
