import * as alt from "alt-client";
import * as native from "natives";

export function setIntoVehicle(vehicle: alt.Vehicle) {
   let data = vehicle.getSyncedMeta("vehicle::data");

   let timeNow = Date.now();
   let timeDiff = timeNow - data.timestamp;

   if (data.owner === alt.Player.local.name && timeDiff < 3000) {
      native.setPedIntoVehicle(alt.Player.local.scriptID, vehicle.scriptID, -1);
   }
}

export function repair(vehicle) {
   native.setVehicleFixed(vehicle.scriptID);
   native.setVehicleDeformationFixed(vehicle.scriptID);
   native.setVehicleUndriveable(vehicle.scriptID, false);
}
