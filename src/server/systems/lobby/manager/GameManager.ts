import * as alt from "alt-server";
import { LobbyStatus } from "../../../enums/LobbyStatus";
import { TimerTypes } from "../../../enums/TimerTypes";
import { logStream } from "../../../configuration/log";
import { LogTypes } from "../../../enums/LogTypes";
import { TimerManager } from "./TimerManager";

export class GameManager {
   static _instance: GameManager;
   _TimerManager: TimerManager;
   _readyPlayers: number;
   _preparedPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._preparedPlayers = 0;
      this._readyPlayers = 0;
      this._player = player;
      this._TimerManager = TimerManager.getInstance();
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player): GameManager {
      return this._instance || (this._instance = new this(player));
   }

   /**
    * Setting Lobby Data for the Player
    * @param  {any} value
    */
   private setMeta(value: any): void {
      this._player.setMeta("player:lobby::data", value);
   }

   /**
    * Retrieving Lobby Data for the Player
    */
   private getMeta(): any {
      return this._player.getMeta("player:lobby::data");
   }

   /**
    * Prepares the Lobby, setting the position vehicle and similar
    */
   public prepare(): void {
      if (!this._player.valid) return;
      if (this.getMeta().status === LobbyStatus.Ready) {
         console.log("player ready");

         this.setMeta({
            status: LobbyStatus.Prepared,
         });

         this._readyPlayers += 1;
         // alt.emit("system:lobby::prepare", false);
         this;
      }
   }
   /**
    * Emmits Game Start
    * @returns void
    */
   public start(): void {
      for (let playerAll of alt.Player.all) {
         if (
            playerAll.getMeta("player:lobby::data").status ===
            LobbyStatus.Prepared
         ) {
            this._preparedPlayers += 1;

            console.log(`readyPlayers: ${this._readyPlayers}`);
            console.log(`preparedPlayers: ${this._preparedPlayers}`);

            if (this._readyPlayers <= this._preparedPlayers) {
               // TIMER PREPARED
               if (!this._TimerManager._isStarted) {
                  logStream("Start Lobby (Prepared)", LogTypes.Lobby);
                  this._TimerManager.start(this._player, TimerTypes.Prep);
               }
               return;
            } else {
               // TIME UNPREPARED
               if (!this._TimerManager._isStarted) {
                  logStream("Start Lobby (Unprepared)", LogTypes.Lobby);
                  this._TimerManager.start(this._player, TimerTypes.Unprep);
               }
               return;
            }
         }
      }
      return logStream("Unable to start Lobby", LogTypes.Lobby);
   }
   /**
    * Stops the current Game, due any reasons
    * @returns void
    */
   public stop(): void {
      this._TimerManager.stop();
      this.reset();
   }

   public restart(): void {}

   private reset(): void {
      this._preparedPlayers = 0;
      this._readyPlayers = 0;
   }
}
