import * as alt from "alt-client";
import { setIntoVehicle } from "./vehicle";

alt.onServer("vehicle:SetIntoVehicle", (vehicle: alt.Vehicle) => {
   setIntoVehicle(vehicle);
});
