import * as alt from "alt-client";
import * as native from "natives";

alt.on("gameEntityCreate", (entity: alt.Entity) => {
   if (entity instanceof alt.Vehicle) {
      alt.log("[DEBUG] New Vehicle in StreamingRange");
      let data = entity.getSyncedMeta("setPedIntoVehicle");

      if (data.owner === this.localPlayer.name) {
         native.setPedIntoVehicle(
            this.localPlayer.scriptID,
            entity.scriptID,
            -1
         );
      }
   }
});
