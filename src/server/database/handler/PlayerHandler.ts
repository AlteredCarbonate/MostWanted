// import * as alt from "alt-server";
// import * as moment from "moment";
// import * as chalk from "chalk";

// import { playerModel, lobbyModel } from "../models";
// import { IPlayer } from "../interface/Iplayer";
// import { ILobby } from "../interface/ILobby";
// import { LobbyStates } from "../../systems/lobby/enum/LobbyStates";

// export class PlayerHandler {
//    constructor() {}

//    public createAccount(player: alt.Player): Promise<IPlayer> {
//       return new Promise(async (res, rej) => {
//          playerModel.findOne({ userName: player.name }, (err, result) => {
//             if (err) {
//                console.log(
//                   chalk.redBright(
//                      "[DATABASE] createAccount Error:\n" + err.message
//                   )
//                );

//                rej(err);
//             }
//             if (!result) {
//                const data = {
//                   userName: player.name,
//                   socialID: parseInt(player.socialId),
//                   rank: 0,
//                   createdAt: moment().format(),
//                };

//                playerModel.insertMany([data]).then(() => {
//                   console.log(chalk.greenBright("[DATABASE] Account Created"));
//                   res();
//                });
//             } else {
//                console.log(
//                   chalk.greenBright("[DATABASE] Account already Found")
//                );
//                res(null);
//             }
//          });
//       });
//    }

//    public requestAccount(player: alt.Player): Promise<IPlayer> {
//       return new Promise(async (res, rej) => {
//          playerModel.findOne(
//             { userName: player.name },
//             (err, result: IPlayer) => {
//                console.log(chalk.redBright("FatCunt, requested account"));
//                if (err) {
//                   console.log(
//                      chalk.redBright(
//                         "[DATABASE] requestAccount Error:\n" + err.message
//                      )
//                   );

//                   rej(err);
//                }

//                if (result) {
//                   res(result);
//                } else {
//                   res(null);
//                }
//             }
//          );
//       });
//    }

//    public async requestLobby(player: alt.Player): Promise<ILobby> {
//       return new Promise(async (res, rej) => {
//          let _account = await this.requestAccount(player);
//          console.log(`RequestLobby ${_account}`);

//          if (_account !== null) {
//             lobbyModel.findOne(
//                { userName: _account._id },
//                (err, result: ILobby) => {
//                   if (err) {
//                      console.log(
//                         chalk.redBright(
//                            "[DATABASE] requestLobby Error:\n" + err.message
//                         )
//                      );

//                      rej(err);
//                   }
//                   if (result) {
//                      res();
//                   } else {
//                      res(null);
//                   }
//                }
//             );
//          }
//       });
//    }

//    public joinLobby(player: alt.Player): Promise<ILobby> {
//       return new Promise(async (res, rej) => {
//          let _account = await this.requestAccount(player);
//          this.requestLobby(player).then((result) => {
//             if (result === null) {
//                const data = {
//                   userName: _account._id,
//                   role: "UNDEFINED",
//                   state: LobbyStates.Init,
//                };

//                lobbyModel.insertMany([data]).then(() => {
//                   console.log(
//                      chalk.greenBright(
//                         `[DATABASE] ${player.name} joined the Lobby.`
//                      )
//                   );
//                   res();
//                });
//             }
//          });
//       });
//    }

//    public leaveLobby(player: alt.Player): Promise<IPlayer> {
//       return new Promise(async (res, rej) => {
//          let _lobby = await this.requestLobby(player);
//          console.log("leaveLobby");
//          console.log(_lobby);
//          if (_lobby !== null) {
//             _lobby
//                .deleteOne()
//                .then(() => {
//                   console.log(
//                      chalk.greenBright(
//                         `[DATABASE] ${player.name} left the Lobby.`
//                      )
//                   );
//                   res();
//                })
//                .catch((err) => {
//                   if (err) {
//                      console.log(
//                         chalk.redBright(
//                            "[DATABASE] leaveLobby Error:\n" + err.message
//                         )
//                      );

//                      rej(err);
//                   }
//                });
//          }
//       });
//    }
// }
