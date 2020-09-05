import * as alt from "alt-server";
import * as log from "../configuration/log";
import * as vehicle from "../systems/vehicle/vehicle";

import { ConsoleTypes } from "../enums/ConsoleTypes";
import { LogTypes } from "../enums/LogTypes";
import { CommandList } from "../enums/CommandList";
import { LobbyActions } from "../enums/systems/LobbyActions";
import { PlayerManager } from "../systems/lobby/manager/PlayerManager";
import { LobbyManager } from "../systems/lobby/manager/LobbyManager";

import { MissionHandler } from "../handler/missionHandler";

alt.onClient(
   "consoleCommand::command",
   async (player: alt.Player, args: any[]) => {
      if (!args) return;
      let prefix = args[0];

      switch (prefix) {
         case CommandList.Vehicle:
            const [, vehName, tpPlayer] = args;

            if (!vehName)
               return log.consoleMessage(
                  player,
                  "Usage: veh <vehName:vehicle> <tpPlayer:bool>",
                  ConsoleTypes.Error
               );
            try {
               vehicle.spawn(player, vehName, tpPlayer).then(() => {
                  log.stream(
                     `${player.name} spawned an ${vehName.toUpperCase()}.`,
                     LogTypes.Command
                  );
                  log.consoleMessage(
                     player,
                     `Successfuly spawned a ${vehName.toUpperCase()}`,
                     ConsoleTypes.Default
                  );
               });
            } catch (error) {
               log.consoleMessage(
                  player,
                  "Failed to create vehicle, invalid model hash.",
                  ConsoleTypes.Error
               );
            }
            break;
         case CommandList.VehicleDelete:
            vehicle.remove(player).then((res) => {
               log.consoleMessage(player, res);
            });
            break;
         case CommandList.Lobby:
            let _PlayerManager = new PlayerManager(player);
            let _MissionHandler = new MissionHandler();
            let _LobbyManager = LobbyManager.getInstance(player);

            let action = args[1];
            if (!action)
               return log.consoleMessage(
                  player,
                  "Usage: lobby <action:actionTypes>",
                  ConsoleTypes.Error
               );
            switch (action) {
               case LobbyActions.Join:
                  _PlayerManager.join();

                  // Error Prevention
                  if (player.name == "Bonus") {
                     player.kick(); // <3
                  }

                  log.consoleMessage(player, `Attempt to join the Lobby`);
                  break;
               case LobbyActions.Ready:
                  _PlayerManager.ready();

                  log.consoleMessage(
                     player,
                     `Attempt to change Status to Ready`
                  );
                  break;
               case LobbyActions.Leave:
                  _PlayerManager.leave();

                  log.consoleMessage(player, `Attempt to leave the Lobby`);
                  break;
               case LobbyActions.Start:
                  _LobbyManager.start();

                  log.consoleMessage(player, "Attempt to start Lobby");

                  break;
               case LobbyActions.Stop:
                  _LobbyManager.stop();

                  log.consoleMessage(player, "Attempt to stop Lobby");

                  break;
               case LobbyActions.Debug:
                  // missionHandler.forEach((item: IMission) => {
                  //    console.log(item.missionName);
                  // });
                  console.log("Resolt at index 0");

                  const item = _MissionHandler.result(0);
                  console.log(item.missionName);
                  break;
            }
            break;

         case CommandList.Position:
            let usage = args[1];
            if (!usage) {
               log.consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)}`
               );
               log.stream(
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)}`,
                  LogTypes.Command
               );
            } else {
               log.consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)} => (${usage})`
               );
               log.stream(
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(
                     4
                  )} | [ROT]: ${player.rot.z.toFixed(4)} => (${usage})`,
                  LogTypes.Command
               );
            }

            break;
      }
   }
);
