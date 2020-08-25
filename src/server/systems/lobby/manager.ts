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
   /**
    * Set Lobbystate to Ready
    * @param  {alt.Player} player
    */
   public static ready(player: alt.Player) {
      const target = lobby.find((item) => item.id == player.id);

      if (target.status === LobbyStatus.Ready)
         return console.log(player.name + " Status already ready.");

      if (target.status === LobbyStatus.Joining) {
         playerInit = false;
         target.status = LobbyStatus.Ready;

         logStream(`${player.name} set Ready.`, LogTypes.Lobby);
      }
   }
   /**
    * Join Lobby
    * @param  {alt.Player} player
    */
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
      }
   }
   /**
    * Leave Lobby
    * @param  {alt.Player} player
    */
   public static leave(player: alt.Player) {
      const target = lobby.findIndex((item) => item.id == player.id);
      if (!playerInit) {
         if (target == -1) return; //NOT FOUND;
         lobby.splice(target);

         logStream(`${player.name} left the Lobby.`, LogTypes.Lobby);
      }
   }
}
