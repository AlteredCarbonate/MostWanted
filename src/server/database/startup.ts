import * as chalk from "chalk";
import * as mongoose from "mongoose";
import { dbURL } from "../configuration/config";

import "./models";

console.log(chalk.greenBright("[DATABASE] Startup"));

mongoose.connect(dbURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
});

mongoose.connection.on("connected", () => {
   console.log(chalk.greenBright("[DATABASE] Connection Successful\n"));
});

mongoose.connection.on("error", (err) => {
   console.log(
      chalk.redBright(
         "[DATABASE] Connection Timeout after 5 Seconds!\n" + err.message
      )
   );
});
