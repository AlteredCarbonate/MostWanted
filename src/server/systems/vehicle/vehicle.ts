import * as alt from "alt-server";

export function spawnVehicle(
   player: alt.Player,
   veh: alt.Vehicle,
   newVehicle = false
) {
   let pos = undefined;
   let rot = undefined;

   const vehicle = new alt.Vehicle(
      veh.model,
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z
   );

   // Setting Modkit
   if (vehicle.modKitsCount >= 1) {
      vehicle.modKit = 1;
   }
   vehicle.setMeta("vehicle::data", { owner: player.name });

   if (newVehicle) {
      alt.emitClient(player, "vehicle:SetIntoVehicle", vehicle);
      vehicle.lockState = 1;
   }
}
