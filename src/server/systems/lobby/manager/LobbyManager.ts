import * as alt from "alt-server";
import * as log from "../../../configuration/log";

import { LobbyStatus } from "../../../enums/systems/LobbyStatus";
import { TimerTypes } from "../../../enums/systems/TimerTypes";
import { LogTypes } from "../../../enums/LogTypes";

import { TimerManager } from "./TimerManager";
import { PlayerManager } from "./PlayerManager";
import { GameManager } from "./GameManager";
import { EventTypes } from "../../../enums/systems/EventTypes";
import { MissionHandler } from "../../../handler/missionHandler";
import { IMission } from "../../../interfaces/IMission";

export class LobbyManager {
   static _instance: LobbyManager;
   _TimerManager: TimerManager;
   _PlayerManager: PlayerManager;
   _GameManager: GameManager;
   _MissionHandler: MissionHandler;

   _readyPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
      this._readyPlayers = 0;

      this._TimerManager = TimerManager.getInstance(player);
      this._PlayerManager = PlayerManager.getInstance(player);
      this._GameManager = GameManager.getInstance(player);
      this._MissionHandler = MissionHandler.getInstance();
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
         this._PlayerManager.applyRole();

         this._MissionHandler.result(0, (item: IMission) => {
            alt.emitClient(this._player, EventTypes.systemLobbyPrepare, item);
            if (
               this._PlayerManager.getMeta().role === "Racer" ||
               !this._PlayerManager.racerChoosen
            ) {
               log.stream(
                  `${this._player.name} starting as Racer.`,
                  LogTypes.Lobby
               );
               this._player.pos = new alt.Vector3(
                  item.racerStart.x,
                  item.racerStart.y,
                  item.racerStart.z
               );
            } else {
               this._player.pos = new alt.Vector3(
                  item.policeStart.x,
                  item.policeStart.y,
                  item.policeStart.z
               );
            }
         });
      }
   }
   /**
    * Emits Lobby Start
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
   }
   /**
    * Stops the Lobby
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
    */
   public restart(): void {
      this.reset();
      this.start();

      log.stream(`Lobby resetting`, LogTypes.Lobby);
   }

   /**
    * Inits the Lobby
    * Sets Position, Vehicle and similar.
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
      this._PlayerManager.reset();
   }
}
