import * as alt from "alt-server";
import * as vehicle from "../systems/vehicle/vehicle";

import { ConsoleTypes } from "../enums/ConsoleTypes";
import { LogTypes } from "../enums/LogTypes";
import { CommandList } from "../enums/CommandList";
import { log } from "../util";
import { PlayerHandler } from "../systems/lobby/handler/PlayerHandler";
import { LobbyHandler, IFilter } from "../systems/lobby/handler/LobbyHandler";
import { IInstance } from "../interfaces/IInstance";
import { LobbyStates } from "../systems/lobby/enum/LobbyStates";
import { LobbyRoles } from "../systems/lobby/enum/LobbyRoles";

let _log = new log();

alt.onClient(
   "consoleCommand::command",
   async (player: alt.Player, args: any[]) => {
      if (!args) return;
      let prefix = args[0];
      let _playerDB: PlayerHandler = new PlayerHandler();
      let _lobbyDB: LobbyHandler = new LobbyHandler();

      let instance: IInstance = {
         name: player.name,
         socialID: player.socialId,
         hwid: player.hwidHash,
         ip: player.ip,
      };

      switch (prefix) {
         case CommandList.Vehicle:
            const [, vehName, tpPlayer] = args;

            if (!vehName)
               return _log.consoleMessage(
                  player,
                  "Usage: veh <vehName:vehicle> <tpPlayer:bool>",
                  ConsoleTypes.Error
               );
            try {
               vehicle.spawn(player, vehName, tpPlayer).then(() => {
                  _log.stream(
                     `${player.name} spawned an ${vehName.toUpperCase()}.`,
                     LogTypes.Command
                  );
                  _log.consoleMessage(
                     player,
                     `Successfuly spawned a ${vehName.toUpperCase()}`,
                     ConsoleTypes.Default
                  );
               });
            } catch (error) {
               _log.consoleMessage(
                  player,
                  "Failed to create vehicle, invalid model hash.",
                  ConsoleTypes.Error
               );
            }
            break;
         case CommandList.VehicleDelete:
            vehicle.remove(player).then((res) => {
               _log.consoleMessage(player, res);
            });
            break;
         case CommandList.Position:
            let usage = args[1];
            if (!usage) {
               _log.consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)}`
               );
               _log.stream(
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)}`,
                  LogTypes.Command
               );
            } else {
               _log.consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)} => (${usage})`
               );
               _log.stream(
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)} => (${usage})`,
                  LogTypes.Command
               );
            }

            break;
         case "createAcc":
            _playerDB.create(instance);
            break;

         case "joinLobby":
            _lobbyDB.join(instance);
            break;
         case "leaveLobby":
            _lobbyDB.leave(instance);
            break;
         case "stateReady":
            _log.consoleMessage(
               player,
               "Setting State to Ready - Default Police"
            );

            // _lobbyDB.setState(instance, "state", LobbyStates.Ready);
            _lobbyDB.setState(instance, "role", LobbyRoles.Police, player);
            break;

         case "requestPlayer":
            const filterRqst: IFilter = {
               key: "state",
               value: LobbyStates.Ready,
            };

            const filterRqst2: IFilter = {
               key: "role",
               value: LobbyRoles.Police,
            };

            console.log(await _lobbyDB.requestPlayers(filterRqst));
            console.log(await _lobbyDB.requestPlayers(filterRqst2));
            break;
      }
   }
);
