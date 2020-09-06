import * as alt from "alt-server";
import * as moment from "moment";
import * as chalk from "chalk";

import { playerModel } from "../models";

export class PlayerHandler {
   _player: alt.Player;

   constructor(player: alt.Player) {
      this._player = player;
   }

   public createAccount(where: string) {
      return new Promise((res, rej) => {
         playerModel.findOne({ userName: where }, (err, result) => {
            if (err) {
               console.log(
                  chalk.redBright("[DATABASE] Error:\n" + err.message)
               );

               rej(err);
            }
            if (!result) {
               let dateNow = moment().format();
               const data = new playerModel({
                  userName: this._player.name,
                  socialID: this._player.socialId,
                  rank: 0,
                  accountCreation: dateNow,
               });

               console.log(chalk.greenBright("[DATABASE] Account Created"));

               data.save();
            } else {
               console.log(
                  chalk.greenBright("[DATABASE] Account already Found")
               );
            }
         });
      });
   }

   public requestAccount(where: string) {
      return new Promise((res, rej) => {
         playerModel.findOne({ userName: where }, (err, result) => {
            if (err) {
               console.log(
                  chalk.redBright("[DATABASE] Error:\n" + err.message)
               );

               rej(err);
            }
            if (result) {
               res(result);
            } else {
               res("Account not Found");
            }
         });
      });
   }
}
