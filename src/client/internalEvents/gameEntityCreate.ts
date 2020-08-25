import * as alt from "alt-client";
import * as native from "natives";

const localPlayer = alt.Player.local;

alt.on("gameEntityCreate", (entity: alt.Entity) => {
   if (entity instanceof alt.Vehicle) {
      alt.log("[DEBUG] New Vehicle in StreamingRange");
      let data = entity.getSyncedMeta("vehicle::data");

      if (data.tpPlayer) {
         if (data.owner === localPlayer.name) {
            native.setPedIntoVehicle(localPlayer.scriptID, entity.scriptID, -1);
         }
      }
   }
});
