import * as alt from "alt-server";
import * as log from "../configuration/log";
import * as util from "../util";
import * as vehicle from "../systems/vehicle/vehicle";

import { LogTypes } from "../enums/LogTypes";
import { PlayerManager } from "../systems/lobby/manager/PlayerManager";
import { IMission } from "../interfaces/IMission";
import { policePool } from "../pool/policePool";
import { racerPool } from "../pool/racerPool";

export class PlayerHandler {
   static _instance: PlayerHandler;
   _PlayerManager: PlayerManager;
   _player: alt.Player;

   private constructor(player: alt.Player) {
      this._player = player;
      this._PlayerManager = PlayerManager.getInstance(player);
   }

   public static getInstance(player: alt.Player): PlayerHandler {
      return this._instance || (this._instance = new this(player));
   }

   public init(item: IMission) {
      return new Promise(async (res) => {
         if (
            this._PlayerManager.getMeta().role === "Racer" ||
            !this._PlayerManager.racerChoosen
         ) {
            // Racer
            let modelName = await this.vehicle();

            this._player.pos = new alt.Vector3(
               item.racerStart.x,
               item.racerStart.y,
               item.racerStart.z
            );

            this._player.rot = new alt.Vector3(0, 0, item.racerStart.rot);

            vehicle.spawn(this._player, modelName, true).then(() => {
               log.stream(
                  `${this._player.name} starting as Racer.`,
                  LogTypes.Lobby
               );
            });
         } else {
            // Police
            let modelName = await this.vehicle();
            this._player.pos = new alt.Vector3(
               item.policeStart.x,
               item.policeStart.y,
               item.policeStart.z
            );
            this._player.rot = new alt.Vector3(0, 0, item.policeStart.rot);

            vehicle.spawn(this._player, modelName, true).then(() => {
               log.stream(
                  `${this._player.name} starting as Police.`,
                  LogTypes.Lobby
               );
            });
         }
         res();
      });
   }

   public async vehicle(): Promise<any> {
      return new Promise((res, rej) => {
         let playerRole = this._PlayerManager.getMeta().role;
         let rndIndex, car;

         if (playerRole === "Racer") {
            rndIndex = util.randomInt(racerPool.length);
            car = racerPool[rndIndex].modelName;
            res(car);
         } else if (playerRole === "Police") {
            rndIndex = util.randomInt(policePool.length);
            car = policePool[rndIndex].modelName;
            res(car);
         } else {
            let error = "Player has no Role";

            log.stream("PlayerHandler vehicle => " + error, LogTypes.Server);
            rej(error);
         }
      });
   }
}
