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
import { PlayerHandler } from "../../../handler/playerHandler";
import { Config } from "../../../configuration/config";

export class LobbyManager {
   static _instance: LobbyManager;
   _TimerManager: TimerManager;
   _PlayerManager: PlayerManager;
   _GameManager: GameManager;
   _MissionHandler: MissionHandler;
   _PlayerHandler: PlayerHandler;

   _readyPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
      this._readyPlayers = 0;

      this._TimerManager = TimerManager.getInstance(player);
      this._PlayerManager = PlayerManager.getInstance(player);
      this._GameManager = GameManager.getInstance(player);
      this._MissionHandler = MissionHandler.getInstance();
      this._PlayerHandler = PlayerHandler.getInstance(player);
   }

   public static getInstance(player: alt.Player): LobbyManager {
      return this._instance || (this._instance = new this(player));
   }

   /**
    * Emits Lobby Start
    */
   public async start(): Promise<void> {
      let isStartable = this.checkStageOne();

      console.log(`readyPlayers: ${this._readyPlayers}`);
      console.log(`allPlayers: ${alt.Player.all.length}`);

      if (isStartable === undefined) {
         log.stream(
            `Unreached minimum of ${Config.minPlayer} Players`,
            LogTypes.Lobby
         );
      } else {
         if (isStartable) {
            log.stream("Lobby is Startable", LogTypes.Lobby);
            if (!this._TimerManager._isStarted) {
               log.stream("Start Lobby (Prepared)", LogTypes.Lobby);

               let type = await this._TimerManager.start(TimerTypes.Prep);
               log.stream(`Lobby Starting...(${type})`, LogTypes.Lobby);

               this.init(type);
            }
         } else {
            log.stream("Lobby isn't Startable", LogTypes.Lobby);
            if (!this._TimerManager._isStarted) {
               log.stream("Start Lobby (Unprepared)", LogTypes.Lobby);

               let type = await this._TimerManager.start(TimerTypes.Unprep);
               log.stream(`Lobby Starting...(${type})`, LogTypes.Lobby);

               this.init(type);
            }
         }
      }
   }
   /**
    * Stops the Lobby
    */
   public stop(): void {
      this._TimerManager.stop();
      log.stream(`Lobby stopped (${this._TimerManager._type})`, LogTypes.Lobby);

      this.reset();
   }
   /**
    * Resets the Lobby
    */
   // public restart(): void {
   //    this.reset();
   //    this.start();

   //    log.stream(`Lobby resetting`, LogTypes.Lobby);
   // }

   /**
    * Inits the Lobby
    * Sets Position, Vehicle and similar.
    */

   public init(type: TimerTypes): void {
      log.console("LobbyManager::INIT");
      alt.emitClient(this._player, EventTypes.systemLobbylocalTimer, type);
   }

   private reset(): void {
      this._readyPlayers = 0;
      this._PlayerManager.reset();

      log.stream(`Lobby resetting`, LogTypes.Lobby);
   }

   public checkStageOne() {
      if (this._PlayerManager.getMeta().status === LobbyStatus.Ready) {
         this._readyPlayers += 1;
         if (Config.minPlayer <= alt.Player.all.length) {
            if (this._readyPlayers <= alt.Player.all.length) {
               return true;
            } else {
               return false;
            }
         }
      }
      return undefined;
   }

   public checkStageTwo() {
      if (!this._player.valid) return;
      if (this._PlayerManager.getMeta().status === LobbyStatus.Ready) {
         const item = this._MissionHandler.result(0);
         console.log("player ready");

         this._PlayerManager.setMeta({
            status: LobbyStatus.Prepared,
         });
         this._PlayerManager.applyRole();

         alt.emitClient(this._player, EventTypes.systemLobbyPrepare, item);
         this._PlayerHandler.init(item);
      }
   }
}

alt.on(EventTypes.systemLobbyStageing, (player: alt.Player) => {
   log.console("LobbyManager systemLobbyStageing");

   let _LobbyManager = LobbyManager.getInstance(player);
   let _GameManager = GameManager.getInstance(player);

   _LobbyManager.checkStageTwo();
   _GameManager.start(5);
});
