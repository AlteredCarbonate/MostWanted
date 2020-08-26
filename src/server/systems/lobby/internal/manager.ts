import * as alt from "alt-server";
import { lobby } from "./globalLobby";
import { LobbyStatus } from "../../../enums/LobbyStatus";
import { LogTypes } from "../../../enums/LogTypes";
import { logStream } from "../../../configuration/log";

alt.on("lobby::init", (player) => {
   player.setMeta("lobby::init", true);
});

export class Manager {
   /**
    * Set Lobbystate to Ready
    * @param  {alt.Player} player
    */
   public static playerReady(player: alt.Player) {
      const target = lobby.find((item) => item.id == player.id);

      if (target.status === LobbyStatus.Ready)
         return console.log(player.name + " Status already ready.");

      if (target.status === LobbyStatus.Joining) {
         target.status = LobbyStatus.Ready;

         logStream(`${player.name} set Ready.`, LogTypes.Lobby);
         console.log("Ready");
         console.table(lobby);
      }
   }
   /**
    * Join Lobby
    * @param  {alt.Player} player
    */
   public static playerJoin(player: alt.Player) {
      if (player.getMeta("lobby::init")) {
         lobby.push({
            id: player.id,
            playerName: player.name,
            rank: 0,
            status: LobbyStatus.Joining,
         });
         player.setMeta("lobby::init", false);

         logStream(`${player.name} joined the Lobby.`, LogTypes.Lobby);
         console.log("Join");
         console.table(lobby);
      }
   }
   /**
    * Leave Lobby
    * @param  {alt.Player} player
    */
   public static playerLeave(player: alt.Player) {
      const target = lobby.findIndex((item) => item.id == player.id);
      if (!player.getMeta("lobby::init")) {
         if (target == -1) return; //NOT FOUND;
         lobby.splice(target);
         player.setMeta("lobby::init", true);

         logStream(`${player.name} left the Lobby.`, LogTypes.Lobby);
         console.log("Leave");
         console.table(lobby);
      }
   }
   /**
    * Prepares the Lobby, setting the position vehicle and similar
    * @param  {alt.Player} player
    * @returns boolean
    */
   public static gamePrepare(player: alt.Player) {
      let preparedPlayer = 0;
      lobby.forEach((e) => {
         if (e.status === LobbyStatus.Ready) {
            e.status = LobbyStatus.Prepared;
            preparedPlayer++;
            return true;
         }
         return false;
      });
   }

   /**
    * Emmits Game Start, requires gamePrepared
    * @param  {alt.Player} player
    */
   public static gameStart(player: alt.Player) {
      if (this.gamePrepare) {
         if (lobby.length > 1) {
            lobby.forEach((e) => {
               e.status === LobbyStatus.Starting;
            });
            logStream("Starting Lobby", LogTypes.Lobby);
         }
         logStream("Unable to start Lobby, not enough player", LogTypes.Lobby);
      }
      logStream("Unable to start Lobby, not prepared", LogTypes.Lobby);
   }
}
