import * as alt from "alt-server";
import { events } from "../systems/eventLibary";
import { LobbyHandler } from "../systems/lobby/handler/LobbyHandler";

let handler = new LobbyHandler();

alt.on(events.system.database.init, () => {
   handler.updateData();
});
