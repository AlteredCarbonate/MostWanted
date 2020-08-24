// import * as alt from "alt-server";

// alt.on("gameEntityCreate", (entity: alt.Entity) => {
//    if (entity instanceof alt.Vehicle) {
//       alt.log("new Vehicle in streamingrange");
//       let information = entity.getSyncedMeta("setPedIntoVehicle");
//       let timeNow = Date.now();

//       let timeDiff = timeNow - information.timestamp;

//       if (information.owner === this.localPlayer.name && timeDiff < 3000) {
//          game.setPedIntoVehicle(this.localPlayer.scriptID, entity.scriptID, -1);
//       }
//    }
// });
