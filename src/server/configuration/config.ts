export const dbURL = "mongodb://localhost:27017/altV";

export const CONFIG = {
   SPAWN: {
      x: 231.8901,
      y: -787.5165,
      z: 30.0212,
   },
   VEHICLE: {
      PLATENAME: "MW",
   },
   HEARTBEAT: 1000 * 2,
   LOBBY: {
      MINPLAYER: 3,
      PREPTIME: 1000 * 15,
      UNPREPTIME: 1000 * 60,
      INITTIME: 1000 * 5,
   },
   WEATHER: {
      CYCLETIME: 1000 * 5,
      CYCLES: [
         0, // Extra sunny
         0, // Extra sunny
         0, // Extra sunny
         0, // Extra sunny
         0, // Extra sunny
         0, // Extra sunny
         0, // Extra sunny
         1, // Clear
         2, // Clouds
         2, // Clouds
         4, // Foggy
         5, // Overcast
         8, // Light Rain
         6, // Rain
         6, // Rain
         7, // Thunder
         7, // Thunder
         6, // Rain
         8, // Light Rain
         5, // Overcast
         2, // Clouds
         1, // Clear
         1, // Clear
      ],
   },
   TIME: {
      STARTHOUR: 6, // What time do we start the server at?
      PERMINUTE: 5, // Used to set the Time Scale of the server for the minute. 1 Minute = 30 Minutes.
      TIMESCALE: 1, // Used to set the Time Scale of the server for the hour.
   },
};
