import * as chalk from "chalk";
import * as mongoose from "mongoose";
import { dbURL } from "../configuration/config";

import "./models";

console.log(chalk.greenBright("[DATABASE] Startup"));

mongoose.connect(dbURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
   console.log(chalk.greenBright("[DATABASE] Connection Successful\n"));
});

mongoose.connection.on("error", (err) => {
   console.log(
      chalk.redBright("[DATABASE] Connection Failure!\n" + err.message)
   );
});

// const kittySchema = new mongoose.Schema({
//    name: String,
// });

// const fluffy = new Kitten({ name: "fluffy" });
// fluffy.save((err, res) => {
//    if (err) {
//       chalk.redBright("[DATABASE] Saving Failure!\n" + err.message);
//    }
// });
