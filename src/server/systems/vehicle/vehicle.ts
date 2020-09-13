import * as alt from "alt-server";

import { CONFIG } from "../../configuration/config";
import { LogTypes } from "../../enums/LogTypes";
import { log } from "../../util";

let _log = new log();

export async function spawn(
   player: alt.Player,
   vehName: string,
   tpPlayer: boolean = false
): Promise<any> {
   return new Promise((res, rej) => {
      let vehicle: alt.Vehicle;
      try {
         vehicle = new alt.Vehicle(
            vehName,
            player.pos.x,
            player.pos.y,
            player.pos.z,
            0,
            0,
            player.rot.z
         );

         if (vehicle) {
            player.setMeta("player::data", {
               hasVehicle: true,
            });
            if (tpPlayer) {
               vehicle.setSyncedMeta("vehicle::data", {
                  owner: player.name,
                  tpPlayer: true,
                  timestamp: Date.now(),
               });
            } else {
               vehicle.setSyncedMeta("vehicle::data", {
                  owner: player.name,
                  tpPlayer: false,
                  timestamp: Date.now(),
               });
            }

            // Setting Modkit
            if (vehicle.modKitsCount >= 1) {
               vehicle.modKit = 1;
            }

            vehicle.numberPlateText = CONFIG.VEHICLE.PLATENAME;

            alt.emitClient(player, "vehicle:SetIntoVehicle", vehicle);
            vehicle.lockState = 1;

            res(vehicle);
         }
      } catch (error) {
         _log.stream("spawnVehicle => " + error, LogTypes.Server);
         rej(error);
      }
   });
}

export async function remove(player: alt.Player): Promise<any> {
   return new Promise((res, rej) => {
      let vehicles: Array<alt.Vehicle> = alt.Vehicle.all;

      try {
         vehicles.forEach((e) => {
            if (!e.valid) return;
            let owner = e.getSyncedMeta("vehicle::data").owner;
            if (owner == player.name) {
               e.destroy();
            }
         });
         res("All valid cars destroyed.");
      } catch (error) {
         _log.stream("removeVehicle => " + error, LogTypes.Server);
         rej(_log.console(error));
      }
   });
}
