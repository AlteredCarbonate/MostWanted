import * as chalk from "chalk";

import { PlayerHandler } from "./PlayerHandler";
import { ILobby } from "../../../database/interface/ILobby";
import { lobbyModel } from "../../../database/models";
import { IInstance } from "../../../interfaces/IInstance";
import { GameHandler } from "./GameHandler";
import { LobbyStates } from "../enum/LobbyStates";

type DataTypes = "insert" | "update";
export class LobbyHandler {
   _playerDB: PlayerHandler;
   _game: GameHandler;

   constructor() {
      this._playerDB = new PlayerHandler();
      this._game = GameHandler.getInstance();
   }

   public updateData() {
      console.log(chalk.greenBright("[DATABASE] Clearing Lobby Data"));
      lobbyModel.collection.deleteMany({});
   }

   public async request(instance: IInstance, all: boolean = false) {
      let _playerAccount = await this._playerDB.request(instance);

      if (_playerAccount !== null) {
         if (!all) {
            return lobbyModel.findOne({ playerReference: _playerAccount._id });
         } else {
            return lobbyModel.find({});
         }
      }
      return null;
   }

   public async requestPlayers() {
      return lobbyModel.find({});
   }

   public async setState(instance: IInstance, type: LobbyStates) {
      if (!type || type == undefined)
         return console.log(chalk.redBright("Cannot setState of undefined"));

      const data: ILobby = {
         state: type,
      };
      this.appendData(data, "update", instance);
   }

   public async join(instance: IInstance) {
      let [_playerAccount, _lobby] = await Promise.all([
         this._playerDB.request(instance),
         this.request(instance),
      ]);

      if (_lobby === null) {
         const data: ILobby = {
            playerReference: _playerAccount._id,
         };

         this.appendData(data);
         console.log(chalk.greenBright(`${instance.name} joined the Lobby.`));

         this._game.appendData("plus");
      } else {
         console.log(chalk.redBright(`${instance.name} already in the Lobby.`));
      }
   }

   public async leave(instance: IInstance) {
      let _playerAccount = await this._playerDB.request(instance);
      await lobbyModel.deleteOne({ playerReference: _playerAccount._id });

      console.log(chalk.redBright(`${instance.name} left Lobby.`));
      this._game.appendData("minus");
   }
   /**
    * Instance is required if type = update
    */
   public async appendData(
      data: ILobby,
      type: DataTypes = "insert",
      instance?: IInstance
   ) {
      if (!data) {
         return console.log(
            chalk.redBright("[LobbyHandler]: Can't append Data of Undefined.")
         );
      }
      if (!type || type == undefined)
         return console.log(
            chalk.redBright("Cannot appendData in Type Undefined")
         );

      switch (type) {
         case "insert":
            console.log(chalk.greenBright("[INSERT]: Data..."));

            await lobbyModel.insertMany([data]);

            break;
         case "update":
            // let _lobby = await this.request(instance);
            if (!instance || instance == undefined) {
               return console.log(
                  chalk.redBright("Cannot request Data of Undefined")
               );
            } else {
               console.log(chalk.greenBright("[UPDATE]: Data..."));

               let _playerAccount = await this._playerDB.request(instance);
               await lobbyModel.findOneAndUpdate(
                  { playerReference: _playerAccount._id },
                  data,
                  { new: false }
               );
            }
            break;
      }
   }
}
