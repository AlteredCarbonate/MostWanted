import * as alt from "alt-server";
import { ConsoleTypes } from "../enums/ConsoleTypes";
import { Config } from "../configuration/config";

alt.onClient(
   "consoleCommand::command",
   (player: alt.Player, args: string[]) => {
      console.log("ARG ONE: " + args[0]);
      console.log("ARG TWO: " + args[1]);
      console.log("ARG TWO: " + args[2]);
      if (!args) return;
      let _prefix = args[0];

      switch (_prefix) {
         case "veh":
            let _vehName = args[1];
            let veh;
            if (!_vehName)
               return consoleMessage(
                  player,
                  "Usage: veh <vehName:vehicle> <tpPlayer:bool>",
                  ConsoleTypes.Error
               );

            try {
               veh = new alt.Vehicle(
                  _vehName,
                  player.pos.x,
                  player.pos.y,
                  player.pos.z,
                  player.rot.x,
                  player.rot.y,
                  player.rot.z
               );
               if (veh) {
                  veh.numberPlateText = Config.vehiclePlateName;

                  if (!args[2]) {
                     veh.setSyncedMeta("vehicle::data", {
                        owner: player.name,
                        tpPlayer: false,
                     });
                  } else if (args[2]) {
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

         default:
            break;
      }
   }
);

export function consoleMessage(
   player: alt.Player,
   message: string,
   type?: ConsoleTypes
) {
   alt.emitClient(player, "consoleCommand::message", message, type);
}
