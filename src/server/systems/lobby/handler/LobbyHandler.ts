import * as chalk from "chalk";

import { PlayerHandler } from "./PlayerHandler";
import { ILobby } from "../../../database/interface/ILobby";
import { lobbyModel } from "../../../database/models";
import { IInstance } from "../../../interfaces/IInstance";
import { GameHandler } from "./GameHandler";

type DataTypes = "insert" | "update";

//Weird behaviour Types doesn't work
export interface IFilter {
   key: "state" | "role";
   value: any;
}

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

   public async requestPlayers(filter?: IFilter) {
      if (!filter) {
         return await lobbyModel.find({});
      }
      if (!filter.key) {
         console.log("requestPlayers");
         return console.log(chalk.redBright("Missing filter.key"));
      }
      switch (filter.key) {
         case "role":
            return await lobbyModel.find({ role: filter.value });

         case "state":
            return await lobbyModel.find({ state: filter.value });
      }
   }

   public async setState(
      instance: IInstance,
      key?: "state" | "role",
      value?: any
   ) {
      if (!value) {
         return await lobbyModel.find({});
      }
      if (value && !key) {
         console.log("setState");
         return console.log(chalk.redBright("Missing filter.key"));
      }

      console.log("setState");
      console.log(key);
      console.log(value);

      let data;
      switch (key) {
         case "state":
            data = {
               state: value,
            };
            break;
         case "role":
            data = {
               role: value,
            };
            break;
      }

      this.appendData(data, "update", instance);
   }

   /**
    * Instance is required if type = update
    */
   public async appendData(
      data: any,
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
            if (!instance || instance == undefined) {
               return console.log(
                  chalk.redBright("Cannot request Data of Undefined")
               );
            } else {
               console.log(chalk.greenBright("[UPDATE]: Data..."));

               let _playerAccount = await this._playerDB.request(instance);
               await lobbyModel.findOneAndUpdate(
                  { playerReference: _playerAccount._id },
                  data
               );
            }
            break;
      }
   }
}
