import * as alt from "alt-server";

alt.onClient(
   "consoleCommand::command",
   (player: alt.Player, ...args: string[]) => {
      console.log(player);
      console.log(args);
      // COMMANDS
      consoleMessage(player, args[0]);
   }
);

export function consoleMessage(
   player: alt.Player,
   message: string,
   type?: string
) {
   alt.emitClient(player, "consoleCommand::message", message, type);
}
