import * as alt from "alt-client";
import * as native from "natives";

let localPlayer = alt.Player.local;

export function setIntoVehicle(vehicle) {
   alt.setTimeout(() => {
      native.setPedIntoVehicle(localPlayer.scriptID, vehicle.scriptID, -1);
   }, 200);
}

export function repair(vehicle) {
   native.setVehicleFixed(vehicle.scriptID);
   native.setVehicleDeformationFixed(vehicle.scriptID);
   native.setVehicleUndriveable(vehicle.scriptID, false);
}
