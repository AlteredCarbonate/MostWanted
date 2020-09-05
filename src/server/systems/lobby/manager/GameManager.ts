import * as alt from "alt-server";
import * as log from "../../../configuration/log";

import { LogTypes } from "../../../enums/LogTypes";
import { EventTypes } from "../../../enums/systems/EventTypes";
import { MissionHandler } from "../../../handler/missionHandler";

export class GameManager {
   static _instance: GameManager;
   _player: alt.Player;
   _MissionHandler: MissionHandler;

   private constructor(player: alt.Player) {
      this._player = player;
      this._MissionHandler = new MissionHandler();
   }

   public static getInstance(player: alt.Player): GameManager {
      return this._instance || (this._instance = new this(player));
   }
   /**
    * Starts Game with Cooldown | Default 5
    */
   public start(cooldown: number = 5) {
      console.log("GAMEMANGER::START");

      if (cooldown) {
         // Display Timer & then Start
         log.stream(`Starting Game... (Cooldown ${cooldown})`, LogTypes.Lobby);

         const item = this._MissionHandler.result(0);
         alt.emitClient(
            this._player,
            EventTypes.systemGameStart,
            item,
            cooldown
         );
      } else {
         // Start without Cooldown
         log.stream(" Starting Game... (No Cooldown)", LogTypes.Lobby);

         const item = this._MissionHandler.result(0);
         alt.emitClient(this._player, EventTypes.systemGameStart, item);
      }
   }

   public stop() {
      alt.emitClient(this._player, EventTypes.systemGameStop);
   }

   public restart() {}
}
