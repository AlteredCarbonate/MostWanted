import * as alt from "alt-client";
import * as vehicle from "../systems/vehicle/vehicle";

alt.on("gameEntityCreate", (entity: alt.Entity) => {
   if (entity instanceof alt.Vehicle) {
      alt.log("[DEBUG] New Vehicle in StreamingRange");
      let data = entity.getSyncedMeta("vehicle::data");

      if (data.tpPlayer) {
         vehicle.setIntoVehicle(entity);
      }
   }
});
