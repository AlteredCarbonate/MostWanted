import * as alt from "alt-server";
import { events } from "../eventLibary";
import { LobbyHandler } from "./handler/LobbyHandler";
import { IInstance } from "../../interfaces/IInstance";

let handler = new LobbyHandler();
alt.on(events.system.lobby.timerStop, () => {});

alt.on(events.system.lobby.leave, (instance: IInstance) => {
   handler.leave(instance);
});

alt.on(events.system.lobby.join, (instance: IInstance) => {
   handler.join(instance);
});
