import * as alt from "alt-server";
import * as log from "../../../configuration/log";
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
   public setMeta(value: any): void {
      this._player.setMeta("player:lobby::data", value);
   }
   /**
    * Retrieving Lobby Data for the Player
    * @param  {alt.Player} player
    */
   public getMeta(): any {
      return this._player.getMeta("player:lobby::data");
   }

   /**
    * Adds Player to the Lobby
    */
   public join(): void {
      if (!this._player.valid) return console.log("Invalid Player tried join.");

      if (this.getMeta().status === LobbyStatus.Init) {
         this.setMeta({ status: LobbyStatus.Joining });
         log.stream(`${this._player.name} joined the Lobby.`, LogTypes.Lobby);
      } else {
         log.stream(
            `${this._player.name} failed to join the Lobby.`,
            LogTypes.Lobby
         );
      }
   }

   /**
    * Sets Player Status: Ready
    */
   public ready(): void {
      if (this.getMeta().status === LobbyStatus.Ready)
         return console.log(this._player.name + " Status already ready.");

      if (this.getMeta().status === LobbyStatus.Joining) {
         this.setMeta({ status: LobbyStatus.Ready });

         log.stream(`${this._player.name} set Ready.`, LogTypes.Lobby);
      }
   }

   /**
    * Removes Player from the Lobby
    */
   public leave(): void {
      if (!this._player.valid)
         return log.stream(`Invalid Player left.`, LogTypes.Lobby);

      if (this.getMeta().status !== LobbyStatus.Init) {
         this.setMeta({ status: LobbyStatus.Init });

         log.stream(`${this._player.name} left the Lobby.`, LogTypes.Lobby);
      }
   }
}
