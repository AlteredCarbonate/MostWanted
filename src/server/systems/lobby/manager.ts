import * as alt from "alt-server";
import { lobby } from "./globalLobby";
import { LobbyStatus } from "../../enums/LobbyStatus";
import { LogTypes } from "../../enums/LogTypes";
import { logStream } from "../../configuration/log";

let playerInit = false;

alt.on("lobby::init", (player) => {
   console.log(player.name + " Triggered Init.");
   playerInit = true;
});

export class Manager {
   public static ready(player: alt.Player) {
      if (lobby[player.id].status)
         return console.log(player.name + " Status already ready.");

      if (lobby[player.id].status === LobbyStatus.Joining) {
         playerInit = false;
         lobby[player.id].status = LobbyStatus.Ready;

         logStream(`${player.name} set Ready.`, LogTypes.Lobby);
         console.log(player.name + " Status Joining, now ready.");
         console.table(lobby);
      }
   }

   public static join(player: alt.Player) {
      if (playerInit) {
         lobby.push({
            id: player.id,
            playerName: player.name,
            rank: 0,
            status: LobbyStatus.Joining,
         });
         playerInit = false;

         logStream(`${player.name} joined the Lobby.`, LogTypes.Lobby);
         console.table(lobby);
      }
   }

   public static leave(player: alt.Player) {
      const target = lobby.findIndex((item) => item.id == player.id);
      if (!playerInit) {
         if (target == -1) return; //NOT FOUND;
         lobby.splice(target);
         console.log(lobby);
      }
   }
}
