import * as alt from "alt-server";
import { ConsoleTypes } from "../enums/ConsoleTypes";
import { Config } from "../configuration/config";
import { logStream } from "../configuration/log";
import { LogTypes } from "../enums/LogTypes";
import { Manager } from "../systems/lobby/manager";
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
            let veh;
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
                  Manager.join(player);

                  logStream(
                     `${player.name} joined the Lobby.`,
                     LogTypes.Command
                  );
                  consoleMessage(
                     player,
                     `Successfuly joined the Lobby`,
                     ConsoleTypes.Default
                  );
                  break;
               case LobbyActions.Ready:
                  Manager.ready(player);

                  logStream(`${player.name} set Ready.`, LogTypes.Command);
                  consoleMessage(
                     player,
                     `Successfuly changed Status to Ready`,
                     ConsoleTypes.Default
                  );
                  break;
               case LobbyActions.Leave:
                  Manager.leave(player);

                  logStream(`${player.name} left the Lobby.`, LogTypes.Command);
                  consoleMessage(
                     player,
                     `Successfuly left the Lobby`,
                     ConsoleTypes.Default
                  );
                  break;
               default:
                  break;
            }
      }
   }
);

/**
 * @param  {alt.Player} player Player
 * @param  {string} message Message to be send
 * @param  {ConsoleTypes} type? Default Default | Types Warning; Error;
 */
export function consoleMessage(
   player: alt.Player,
   message: string,
   type: ConsoleTypes = ConsoleTypes.Default
) {
   alt.emitClient(player, "consoleCommand::message", message, type);
}
