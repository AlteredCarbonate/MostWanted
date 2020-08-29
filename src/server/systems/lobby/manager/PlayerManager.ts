import * as alt from "alt-server";
import { logStream } from "../../../configuration/log";
import { LobbyStatus } from "../../../enums/systems/LobbyStatus";
import { LogTypes } from "../../../enums/LogTypes";

export class PlayerManager {
   static _instance: PlayerManager;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player): PlayerManager {
      return this._instance || (this._instance = new this(player));
   }

   /**
    * Setting Lobby Data for the Player
    * @param  {alt.Player} player
    * @param  {any} value
    */
   private setMeta(player: alt.Player, value: any): void {
      player.setMeta("player:lobby::data", value);
   }
   /**
    * Retrieving Lobby Data for the Player
    * @param  {alt.Player} player
    */
   private getMeta(player: alt.Player): any {
      return player.getMeta("player:lobby::data");
   }

   /**
    * Join Lobby
    * @param  {alt.Player} player
    */
   public join(player: alt.Player): void {
      if (!player.valid) return console.log("Invalid Player requested to join"); //NOT FOUND;
      console.log(`Joining Current: ${this.getMeta(player).status}`);
      if (this.getMeta(player).status !== LobbyStatus.Init) {
         logStream(`${player.name} failed to join the Lobby.`, LogTypes.Lobby);
      }

      if (this.getMeta(player).status === LobbyStatus.Init) {
         this.setMeta(player, { status: LobbyStatus.Joining });
         console.log(`Joining Changed: ${this.getMeta(player).status}`);

         logStream(`${player.name} joined the Lobby.`, LogTypes.Lobby);
      }
   }

   /**
    * Set Lobbystate to Ready
    * @param  {alt.Player} player
    */
   public ready(player: alt.Player): void {
      if (this.getMeta(player).status === LobbyStatus.Ready)
         return console.log(player.name + " Status already ready.");

      if (this.getMeta(player).status === LobbyStatus.Joining) {
         this.setMeta(player, { status: LobbyStatus.Ready });

         logStream(`${player.name} set Ready.`, LogTypes.Lobby);
      }
   }

   /**
    * Leave Lobby
    * @param  {alt.Player} player
    */
   public leave(player: alt.Player): void {
      console.log(`Leaving Current: ${this.getMeta(player).status}`);
      if (!player.valid)
         return logStream(`INVALID left the Lobby.`, LogTypes.Lobby); //NOT FOUND;
      if (this.getMeta(player).status !== LobbyStatus.Init) {
         this.setMeta(player, { status: LobbyStatus.Init });

         logStream(`${player.name} left the Lobby.`, LogTypes.Lobby);
      }
   }
}
