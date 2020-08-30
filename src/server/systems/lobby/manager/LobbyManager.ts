import * as alt from "alt-server";
import * as log from "../../../configuration/log";

import { LobbyStatus } from "../../../enums/systems/LobbyStatus";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { LogTypes } from "../../../enums/LogTypes";
import { TimerCB } from "../../../enums/systems/TimerCB";

import { TimerManager } from "./TimerManager";
import { PlayerManager } from "./PlayerManager";
import { GameManager } from "./GameManager";

export class LobbyManager {
   static _instance: LobbyManager;
   _TimerManager: TimerManager;
   _PlayerManager: PlayerManager;
   _GameManager: GameManager;

   _readyPlayers: number;
   _preparedPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._preparedPlayers = 0;
      this._readyPlayers = 0;
      this._player = player;

      this._TimerManager = TimerManager.getInstance(player);
      this._PlayerManager = PlayerManager.getInstance(player);
      this._GameManager = GameManager.getInstance(player);
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player): LobbyManager {
      return this._instance || (this._instance = new this(player));
   }

   /**
    * Prepares the Lobby, setting the position vehicle and similar
    */
   public prepare(): void {
      if (!this._player.valid) return;
      if (this._PlayerManager.getMeta().status === LobbyStatus.Ready) {
         console.log("player ready");

         this._PlayerManager.setMeta({
            status: LobbyStatus.Prepared,
         });

         this._readyPlayers += 1;
         alt.emitClient(this._player, "system:lobby::prepare");
         this;
      }
   }
   /**
    * Emits Lobby Start
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
               if (!this._TimerManager._isStarted) {
                  log.stream("Start Lobby (Prepared)", LogTypes.Lobby);
                  this._TimerManager
                     .start(TimerTypes.Prep)
                     .then((res: TimerCB) => {
                        if (res == TimerCB.Finished) {
                           log.stream(
                              `Lobby Starting...(${this._TimerManager._type})`,
                              LogTypes.Lobby
                           );

                           this.init();
                        }
                     });
               }
               return;
            } else {
               if (!this._TimerManager._isStarted) {
                  log.stream("Start Lobby (Unprepared)", LogTypes.Lobby);

                  this._TimerManager
                     .start(TimerTypes.Unprep)
                     .then((res: TimerCB) => {
                        if (res == TimerCB.Finished) {
                           log.stream(
                              `Lobby Starting...(${this._TimerManager._type})`,
                              LogTypes.Lobby
                           );

                           this.init();
                        }
                     });
               }
               return;
            }
         }
      }
      return log.stream("Unable to start Lobby", LogTypes.Lobby);
   }
   /**
    * Stops the Lobby
    * @returns void
    */
   public stop(): void {
      this._TimerManager.stop().then((res: TimerCB) => {
         if (res == TimerCB.Stopped) {
            log.stream(
               `Lobby stopped (${this._TimerManager._type})`,
               LogTypes.Lobby
            );

            this.reset();
         }
      });
   }
   /**
    * Resets the Lobby
    * @returns void
    */
   public restart(): void {
      this.reset();
      this.start();
   }

   private reset(): void {
      this._preparedPlayers = 0;
      this._readyPlayers = 0;
   }
   /**
    * Inits the Lobby
    * Sets Position, Vehicle and similar.
    * @returns void
    */
   public init(): void {
      log.console("LobbyManager::INIT");
      alt.emitClient(this._player, "system:lobby::localTimer");

      this._GameManager.start(5);
   }
}
