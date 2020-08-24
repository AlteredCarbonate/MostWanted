import * as alt from "alt-server";
import { ILobbyInfo } from "../../interfaces/ILobbyInfo";
import { LobbyStatus } from "../../enums/LobbyStatus";

let lobby: Array<ILobbyInfo> = [];

alt.onClient("system:lobby::ready", (player: alt.Player) => {
   player.setMeta("lobby::ready", true);
   lobby.push({
      id: player.id,
      playerName: player.name,
      rank: 0,
      status: LobbyStatus.Ready,
   });
   console.log(lobby);
});

// {
//   id: 1,
//   playerName: "Carbon",
//   rank: 2,
//   status: Ready
// }
