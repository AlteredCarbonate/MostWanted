import * as alt from "alt-server";
import { playerModel, playerDataModel } from "../models";
import { IPlayer } from "../interface/IPlayer";
import * as chalk from "chalk";
import { IPlayerData } from "../interface/IPlayerData";
// import * as moment from "moment";
// import * as chalk from "chalk";

export class PlayerHandler {
   constructor() {}

   /**
    * Returns NULL if not found.
    * @param  where Default: player.name
    *
    */
   public request(player: alt.Player, where = player.name) {
      return playerModel.findOne({ userName: where });
   }

   /**
    * Creates User Account
    */
   public async create(player: alt.Player) {
      let _playerAccount = await this.request(player);

      if (_playerAccount === null) {
         const data: IPlayer = {
            userName: player.name,
         };

         const data2: IPlayerData = {
            socialID: parseInt(player.socialId),
            ip: player.ip.replace("::ffff:", ""),
            hwid: parseInt(player.hwidHash),
         };
         this.appendData(data);
         this.appendData(data2, "playerDataModel");
         console.log(chalk.greenBright("Account created."));
      } else {
         console.log(chalk.redBright("Account already found."));
      }
   }
   /**
    * Appends Data to the choosen Collection
    * @param collection Default: playerModel
    */
   public async appendData(
      data: IPlayer | IPlayerData,
      collection: "playerModel" | "playerDataModel" = "playerModel"
   ) {
      if (!data) {
         return console.log(
            chalk.redBright("[LobbyHandler]: Can't append Data of Undefined.")
         );
      }
      switch (collection) {
         case "playerModel":
            await playerModel.insertMany([data]);
            console.log(chalk.greenBright("[playerModel]: Appending data..."));
            break;
         case "playerDataModel":
            await playerDataModel.insertMany([data]);
            console.log(
               chalk.greenBright("[playerDataModel]: Appending data...")
            );
            break;
      }
   }
}
