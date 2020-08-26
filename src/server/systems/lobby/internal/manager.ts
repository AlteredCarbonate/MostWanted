import * as alt from "alt-server";
import { LobbyStatus } from "../../../enums/LobbyStatus";
import { LogTypes } from "../../../enums/LogTypes";
import { logStream } from "../../../configuration/log";

alt.on("lobby::init", (player) => {
   player.setMeta("lobby::data", { status: LobbyStatus.Init });
});

export class PlayerManager {
   /**
    * Join Lobby
    * @param  {alt.Player} player
    */
   public static join(player: alt.Player) {
      console.log(`Joining Current: ${player.getMeta("lobby::data").status}`);
      if (player.getMeta("lobby::data").status !== LobbyStatus.Init) {
         logStream(`${player.name} failed to join the Lobby.`, LogTypes.Lobby);
      }

      if (player.getMeta("lobby::data").status === LobbyStatus.Init) {
         player.setMeta("lobby::data", { status: LobbyStatus.Joining });
         console.log(
            `Joining Changed: ${player.getMeta("lobby::data").status}`
         );

         logStream(`${player.name} joined the Lobby.`, LogTypes.Lobby);
      }
   }

   /**
    * Set Lobbystate to Ready
    * @param  {alt.Player} player
    */
   public static ready(player: alt.Player) {
      if (player.getMeta("lobby::data").status === LobbyStatus.Joining) {
         player.setMeta("lobby::data", { status: LobbyStatus.Ready });

         logStream(`${player.name} set Ready.`, LogTypes.Lobby);
      }

      if (player.getMeta("lobby::data").status === LobbyStatus.Ready)
         return console.log(player.name + " Status already ready.");
   }

   /**
    * Leave Lobby
    * @param  {alt.Player} player
    */
   public static leave(player: alt.Player) {
      console.log(`Leaving Current: ${player.getMeta("lobby::data").status}`);
      if (player.getMeta("lobby::data").status !== LobbyStatus.Init) {
         if (!player.valid) return; //NOT FOUND;
         player.setMeta("lobby::data", { status: LobbyStatus.Init });

         logStream(`${player.name} left the Lobby.`, LogTypes.Lobby);
      }
   }
}

// let preparedPlayer = 0;
export class GameManager {
   /**
    * Prepares the Lobby, setting the position vehicle and similar
    * @param  {alt.Player} player
    * @returns boolean
    */
   public static prepare(player: alt.Player): boolean {
      // lobby.forEach((e) => {
      //    if (e.status === LobbyStatus.Ready) {
      //       e.status = LobbyStatus.Prepared;
      //       console.log(e.status);
      //       return true;
      //    }
      //    return false;
      // });
      return false;
   }

   /**
    * Emmits Game Start, requires gamePrepared
    * @param  {alt.Player} player
    */
   public static start(player: alt.Player) {
      // console.log(`Prepared State: ${this.prepare(player)}`);
      if (this.prepare(player)) {
         // if (lobby.length > 1) {
         //    lobby.forEach((e) => {
         //       e.status === LobbyStatus.Starting;
         //    });
         //    return logStream("Starting Lobby", LogTypes.Lobby);
         // }
         return logStream(
            "Unable to start Lobby, not enough player",
            LogTypes.Lobby
         );
      }
      return logStream("Unable to start Lobby, not prepared", LogTypes.Lobby);
   }
}
