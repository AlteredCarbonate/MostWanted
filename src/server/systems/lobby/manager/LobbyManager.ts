import * as alt from "alt-server";
import * as log from "../../../configuration/log";

import { LobbyStatus } from "../../../enums/systems/LobbyStatus";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { LogTypes } from "../../../enums/LogTypes";

import { TimerManager } from "./TimerManager";
import { PlayerManager } from "./PlayerManager";
import { GameManager } from "./GameManager";
import { EventTypes } from "../../../enums/systems/EventTypes";

export class LobbyManager {
   static _instance: LobbyManager;
   _TimerManager: TimerManager;
   _PlayerManager: PlayerManager;
   _GameManager: GameManager;

   _readyPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
      this._readyPlayers = 0;

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
         alt.emitClient(this._player, EventTypes.systemLobbyPrepare);
      }
   }
   /**
    * Emits Lobby Start
    * @returns void
    */
   public start(): void {
      console.log(`readyPlayers: ${this._readyPlayers}`);
      console.log(`allPlayers: ${alt.Player.all.length}`);

      this.check((state) => {
         if (state) {
            log.stream("State: True", LogTypes.Lobby);
            if (!this._TimerManager._isStarted) {
               log.stream("Start Lobby (Prepared)", LogTypes.Lobby);
               this._TimerManager.start(TimerTypes.Prep, (type: TimerTypes) => {
                  log.stream(`Lobby Starting...(${type})`, LogTypes.Lobby);
                  log.console("Timerstart CB");

                  this.init(type);
               });
            }
         } else {
            log.stream("State: False", LogTypes.Lobby);
            if (!this._TimerManager._isStarted) {
               log.stream("Start Lobby (Unprepared)", LogTypes.Lobby);

               this._TimerManager.start(
                  TimerTypes.Unprep,
                  (type: TimerTypes) => {
                     log.stream(`Lobby Starting...(${type})`, LogTypes.Lobby);
                     log.console("Timerstart CB");

                     this.init(type);
                  }
               );
            }
         }
      });
      // for (let playerAll of alt.Player.all) {
      //    if (
      //       playerAll.getMeta("player:lobby::data").status ===
      //       LobbyStatus.Prepared
      //    ) {
      //    }
      // }
      // return log.stream("Unable to start Lobby", LogTypes.Lobby);
   }
   /**
    * Stops the Lobby
    * @returns void
    */
   public stop(): void {
      this._TimerManager.stop(() => {
         log.stream(
            `Lobby stopped (${this._TimerManager._type})`,
            LogTypes.Lobby
         );

         this.reset();
      });
   }
   /**
    * Resets the Lobby
    * @returns void
    */
   public restart(): void {
      this.reset();
      this.start();

      log.stream(`Lobby resetting`, LogTypes.Lobby);
   }

   /**
    * Inits the Lobby
    * Sets Position, Vehicle and similar.
    * @returns void
    */
   public init(type: TimerTypes): void {
      log.console("LobbyManager::INIT");
      alt.emitClient(this._player, EventTypes.systemLobbylocalTimer, type);

      this._GameManager.start(5);
   }

   public check(cb) {
      if (this._readyPlayers <= alt.Player.all.length) {
         cb(true);
      } else {
         cb(false);
      }
   }

   private reset(): void {
      this._readyPlayers = 0;
   }
}
