import * as alt from "alt-server";
import { ConsoleTypes } from "../enums/ConsoleTypes";
import { Config } from "../configuration/config";
import { logStream } from "../configuration/log";
import { LogTypes } from "../enums/LogTypes";
import { PlayerManager, GameManager } from "../systems/lobby/internal/manager";
import { CommandList } from "../enums/CommandList";
import { LobbyActions } from "../enums/LobbyActions";

alt.onClient(
   "consoleCommand::command",
   (player: alt.Player, args: string[]) => {
      if (!args) return;
      let prefix = args[0];

      switch (prefix) {
         case CommandList.Vehicle:
            const [, vehName, tpPlayer] = args;
            let veh: any;

            if (!vehName)
               return consoleMessage(
                  player,
                  "Usage: veh <vehName:vehicle> <tpPlayer:bool>",
                  ConsoleTypes.Error
               );
            try {
               veh = new alt.Vehicle(
                  vehName,
                  player.pos.x,
                  player.pos.y,
                  player.pos.z,
                  player.rot.x,
                  player.rot.y,
                  player.rot.z
               );
               if (veh) {
                  veh.numberPlateText = Config.vehiclePlateName;
                  logStream(
                     `${player.name} spawned an ${vehName.toUpperCase()}.`,
                     LogTypes.Command
                  );
                  consoleMessage(
                     player,
                     `Successfuly spawned a ${vehName.toUpperCase()}`,
                     ConsoleTypes.Default
                  );

                  if (!tpPlayer) {
                     veh.setSyncedMeta("vehicle::data", {
                        owner: player.name,
                        tpPlayer: false,
                     });
                  } else if (tpPlayer) {
                     veh.setSyncedMeta("vehicle::data", {
                        owner: player.name,
                        tpPlayer: true,
                     });
                  }
               }
            } catch (error) {
               consoleMessage(
                  player,
                  "Failed to create vehicle, invalid model hash.",
                  ConsoleTypes.Error
               );
            }
            break;

         case CommandList.Lobby:
            let action = args[1];
            if (!action)
               return consoleMessage(
                  player,
                  "Usage: lobby <action:actionTypes>",
                  ConsoleTypes.Error
               );

            switch (action) {
               case LobbyActions.Join:
                  PlayerManager.join(player);

                  consoleMessage(player, `Attempt to join the Lobby`);
                  break;
               case LobbyActions.Ready:
                  PlayerManager.ready(player);

                  consoleMessage(player, `Attempt to change Status to Ready`);
                  break;
               case LobbyActions.Leave:
                  PlayerManager.leave(player);

                  consoleMessage(player, `Attempt to leave the Lobby`);
                  break;
               case LobbyActions.Start:
                  GameManager.start(player);
                  consoleMessage(player, "Attempt to start Lobby");
                  break;
            }
            break;

         case CommandList.Position:
            let usage = args[1];
            if (!usage) {
               consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(4)}`
               );
            } else {
               consoleMessage(
                  player,
                  `[X]: ${player.pos.x.toFixed(4)} [Y]: ${player.pos.y.toFixed(
                     4
                  )} [Z]: ${player.pos.z.toFixed(4)} => (${usage})`
               );
            }

            break;
      }
   }
);

/**
 * Send a Player a specific consoleMessage
 * @param  {alt.Player} player Player
 * @param  {any} message Message to be send
 * @param  {ConsoleTypes} type? Default Default | Types Default; Warning; Error;
 */
export function consoleMessage(
   player: alt.Player,
   message: any,
   type: ConsoleTypes = ConsoleTypes.Default
) {
   alt.emitClient(player, "consoleCommand::message", message, type);
}
