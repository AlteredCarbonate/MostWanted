export enum EventTypes {
   // LOBBY
   systemLobbyJoin = "system:lobby::join",
   systemLobbyReady = "system:lobby::ready",
   systemLobbyInit = "system:lobby::init",
   systemLobbyPrepare = "system:lobby::prepare",
   systemLobbylocalTimer = "system:lobby::localTimer",
   // GAME
   systemGameStart = "system:game::start",
   systemGameStop = "system:game::stop",
}
