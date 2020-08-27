import * as alt from "alt-server";
import { LobbyStatus } from "../../enums/LobbyStatus";
import { LogTypes } from "../../enums/LogTypes";
import { logStream } from "../../configuration/log";
import { TimerTypes } from "../../enums/TimerTypes";
import * as moment from "moment";
import { Config } from "../../configuration/config";

export class PlayerManager {
   static _instance: PlayerManager;
   // _player: alt.Player;

   private constructor() {
      // this._player = player;
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   /**
    * Setting Lobby Data for the Player
    * @param  {alt.Player} player
    * @param  {any} value
    */
   private setMeta(player: alt.Player, value: any) {
      player.setMeta("player:lobby::data", value);
   }
   /**
    * Retrieving Lobby Data for the Player
    * @param  {alt.Player} player
    */
   private getMeta(player: alt.Player) {
      return player.getMeta("player:lobby::data");
   }

   /**
    * Join Lobby
    * @param  {alt.Player} player
    */
   public join(player: alt.Player) {
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
   public ready(player: alt.Player) {
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
   public leave(player: alt.Player) {
      console.log(`Leaving Current: ${this.getMeta(player).status}`);
      if (!player.valid) return console.log("Can't remove invalid Player"); //NOT FOUND;
      if (this.getMeta(player).status !== LobbyStatus.Init) {
         this.setMeta(player, { status: LobbyStatus.Init });

         logStream(`${player.name} left the Lobby.`, LogTypes.Lobby);
      }
   }
}
export class GameManager {
   static _instance: GameManager;
   _readyPlayers: number;
   _preparedPlayers: number;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._preparedPlayers = 0;
      this._readyPlayers = 0;
      this._player = player;
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player) {
      return this._instance || (this._instance = new this(player));
   }
   /**
    * Setting Lobby Data for the Player
    * @param  {any} value
    */
   private setMeta(value: any) {
      this._player.setMeta("player:lobby::data", value);
   }
   /**
    * Retrieving Lobby Data for the Player
    */
   private getMeta() {
      return this._player.getMeta("player:lobby::data");
   }

   /**
    * Prepares the Lobby, setting the position vehicle and similar
    */
   public prepare() {
      if (!this._player.valid) return;
      if (this.getMeta().status === LobbyStatus.Ready) {
         console.log("player ready");

         this.setMeta({
            status: LobbyStatus.Prepared,
         });

         ++this._readyPlayers;
         // alt.emit("system:lobby::prepare", false);
         this;
      }
   }
   /**
    * Emmits Game Start, requires gamePrepared
    * @param  {alt.Player} player
    */
   public start() {
      for (let playerAll of alt.Player.all) {
         if (
            playerAll.getMeta("player:lobby::data").status ===
            LobbyStatus.Prepared
         ) {
            ++this._preparedPlayers;

            console.log(`readyPlayers: ${this._readyPlayers}`);
            console.log(`preparedPlayers: ${this._preparedPlayers}`);

            let _TimerManager = TimerManager.getInstance();

            if (this._readyPlayers <= this._preparedPlayers) {
               // TIMER PREPARED
               _TimerManager.start(this._player, TimerTypes.Default);
               return logStream("Start Lobby (Prepared)", LogTypes.Lobby);
            } else {
               // TIME UNPREPARED
               _TimerManager.start(this._player, TimerTypes.Unprep);
               return logStream("Start Lobby (Unprepared)", LogTypes.Lobby);
            }
         }
      }
      return logStream("Unable to start Lobby, not prepared", LogTypes.Lobby);
   }
}

export class TimerManager {
   static _instance: TimerManager;
   _isStarted: boolean = false;
   _timerInter: number;

   private constructor() {}

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance() {
      return this._instance || (this._instance = new this());
   }

   public start(player, type: TimerTypes = TimerTypes.Default) {
      let timeDiff;
      if (type === TimerTypes.Default) {
         logStream("Default Timer started", LogTypes.Lobby);
         alt.emitClient(player, "system::lobby:localTimer", TimerTypes.Default);

         timeDiff = moment().add(Config.defaultTimer, "ms");
      }

      if (type === TimerTypes.Unprep) {
         logStream("Unprepared Timer started", LogTypes.Lobby);
         alt.emitClient(player, "system::lobby:localTimer", TimerTypes.Unprep);

         timeDiff = moment().add(Config.unprepTimer, "ms");
      }

      this._timerInter = alt.setInterval(() => {
         var timer = Math.floor(moment().diff(timeDiff) / 1000);
         if (timer < 1) {
            // Outputting Timer
            console.log(timer);
         } else {
            alt.clearInterval(this._timerInter);

            if (type === TimerTypes.Default) {
               logStream("Default Timer finished", LogTypes.Lobby);
               this._isStarted = false;
            }

            if (type === TimerTypes.Unprep) {
               logStream("Unprepared Timer finished", LogTypes.Lobby);
               this._isStarted = false;
            }
         }
      }, 1000);
   }
}
