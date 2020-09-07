import * as alt from "alt-server";
import { playerModel } from "../models";
import { IPlayer } from "../interface/IPlayer";
import * as chalk from "chalk";
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
            socialID: parseInt(player.socialId),
         };
         playerModel.insertMany([data]);
         console.log(chalk.greenBright("Account created."));
      } else {
         console.log(chalk.redBright("Account already found."));
      }
   }
}
