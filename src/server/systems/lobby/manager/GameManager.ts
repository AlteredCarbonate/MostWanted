import * as alt from "alt-server";

import * as log from "../../../configuration/log";
import { LogTypes } from "../../../enums/LogTypes";

export class GameManager {
   static _instance: GameManager;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
   }

   /**
    * Gets the current Instance of the Manager
    */
   public static getInstance(player: alt.Player): GameManager {
      return this._instance || (this._instance = new this(player));
   }

   public start(cooldown: number = 5) {
      console.log("GAMEMANGER::START");

      if (cooldown) {
         // Display Timer & then Start
         log.stream(
            `TEMP: Starting Game... (Cooldown ${cooldown})`,
            LogTypes.Lobby
         );
         alt.emitClient(this._player, "system:game::start", cooldown);
      } else {
         // Start without Cooldown
         log.stream("TEMP: Starting Game... (No Cooldown)", LogTypes.Lobby);
         alt.emitClient(this._player, "system:game::start");
      }
   }

   public stop() {
      alt.emitClient(this._player, "system:game::stop");
   }

   public restart() {}
}
