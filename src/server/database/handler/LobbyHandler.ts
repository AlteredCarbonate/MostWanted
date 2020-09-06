import * as alt from "alt-server";

export class LobbyHandler {
   _player: alt.Player;

   constructor(player: alt.Player) {
      this._player = player;
   }
}
