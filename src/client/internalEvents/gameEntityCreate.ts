import * as alt from "alt-client";
import { setIntoVehicle } from "../systems/vehicle/vehicle";

alt.on("gameEntityCreate", (entity: alt.Entity) => {
   if (entity instanceof alt.Vehicle) {
      alt.log("[DEBUG] New Vehicle in StreamingRange");
      let data = entity.getSyncedMeta("vehicle::data");

      if (data.tpPlayer) {
         setIntoVehicle(entity);
      }
   }
});
