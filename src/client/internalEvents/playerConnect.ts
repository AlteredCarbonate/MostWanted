import * as alt from "alt-client";

alt.onServer("server:startHandshake", () => {
  alt.log(`Got handshake request from Server, responding`);
  alt.emitServer("client:endHandshake");
});
