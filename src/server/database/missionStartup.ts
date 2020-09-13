import * as alt from "alt-server";
import { MissionHandler } from "../systems/lobby/handler/MissionHandler";
import { events } from "../systems/eventLibary";

let handler = MissionHandler.getInstance();

alt.on(events.system.database.init, async () => {
   handler.updateData();
});
