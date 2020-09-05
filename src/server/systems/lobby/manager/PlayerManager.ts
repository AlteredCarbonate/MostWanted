import * as alt from "alt-server";
import * as log from "../../../configuration/log";
import { LobbyStatus } from "../../../enums/systems/LobbyStatus";
import { LogTypes } from "../../../enums/LogTypes";

export class PlayerManager {
   _player: alt.Player;
   Indexer: number;
   racerChoosen: boolean = false;

   constructor(player: alt.Player) {
      this._player = player;
   }

   /**
    * Setting Lobby Data for the Player
    * @param  {alt.Player} player
    * @param  {any} value
    */
   public setMeta(value: any, invokePlayer?): void {
      if (!invokePlayer) {
         this._player.setMeta("player:lobby::data", value);
      } else {
         invokePlayer.setMeta("player:lobby::data", value);
      }
   }
   /**
    * Retrieving Lobby Data for the Player
    * @param  {alt.Player} player
    */
   public getMeta(invokePlayer?): any {
      if (!invokePlayer) {
         return this._player.getMeta("player:lobby::data");
      } else {
         return invokePlayer.getMeta("player:lobby::data");
      }
   }

   /**
    * Adds Player to the Lobby
    */
   public join(): void {
      this.Indexer += 1;
      if (!this._player.valid) return console.log("Invalid Player tried join.");

      if (this.getMeta().status === LobbyStatus.Init) {
         this.setMeta({ index: this.Indexer, status: LobbyStatus.Joining });
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
    * Applies Role to player | Racer; Police
    */
   public applyRole(): void {
      const rndplayer =
         alt.Player.all[Math.floor(Math.random() * alt.Player.all.length)];
      const allPlayers = [...alt.Player.all];
      if (!this.racerChoosen) {
         this.setMeta({ role: "Racer" }, rndplayer);
         this.racerChoosen = true;
      } else {
         const allPolice = allPlayers.filter((e) => e.id != rndplayer.id);

         allPolice.forEach((e) => {
            this.setMeta({ role: "Police" }, e);
         });
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

   public reset() {
      this.Indexer = 0;
      this.racerChoosen = false;
   }
}
