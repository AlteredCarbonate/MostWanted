import * as chalk from "chalk";
import { playerModel, accountDataModel } from "../../../database/models";
import { IAccountData } from "../../../database/interface/IAccountData";
import { IPlayer } from "../../../database/interface/IPlayer";
import { IInstance } from "../../../interfaces/IInstance";

// import * as moment from "moment";
// import * as chalk from "chalk";

export class PlayerHandler {
   constructor() {}

   /**
    * Returns NULL if not found.
    */
   public request(target: IInstance) {
      return playerModel.findOne({
         userName: target.name,
      });
   }

   /**
    * Creates User Account
    */
   public async create(instance: IInstance) {
      let _playerAccount = await this.request(instance);

      if (_playerAccount === null) {
         const data: IPlayer = {
            userName: instance.name,
         };

         await this.appendData(data).then(() => {
            this.createData(instance);
         });

         console.log(chalk.greenBright("Account created."));
      } else {
         console.log(chalk.redBright("Account already found."));
      }
   }

   public async createData(instance: IInstance) {
      let _playerAccount = await this.request(instance);
      const accountData: IAccountData = {
         playerReference: _playerAccount._id,
         socialID: parseInt(instance.socialID),
         ip: instance.ip.replace("::ffff:", ""),
         hwid: parseInt(instance.hwid),
      };

      await this.appendData(accountData, "accountData");
      console.log(chalk.greenBright("AccountData added."));
   }
   /**
    * Appends Data to the choosen Collection
    * @param collection Default: player
    */
   public async appendData(
      data: IPlayer | IAccountData,
      collection: "player" | "accountData" = "player"
   ) {
      if (!data) {
         return console.log(
            chalk.redBright("[LobbyHandler]: Can't append Data of Undefined.")
         );
      }
      switch (collection) {
         case "player":
            await playerModel.insertMany([data]);
            console.log(chalk.greenBright("[playerModel]: Appending data..."));
            break;
         case "accountData":
            await accountDataModel.insertMany([data]);
            console.log(
               chalk.greenBright("[accountDataModel]: Appending data...")
            );
            break;
      }
   }
}
