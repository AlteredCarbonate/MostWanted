export const Config = {
   // Spawn Location / Camera Point
   defaultSpawnPoint: {
      x: 231.8901,
      y: -787.5165,
      z: 30.0212,
   },
   //  Data
   vehiclePlateName: "MW",
   // Timers
   // - Player
   timeRewardTime: 60000 * 5, // How much time before a reward point is added.
   timePlayerSaveTime: 60000 * 2, // How many minutes before we save all player data.
   // - Lobby
   minPlayer: 0,
   defaultTimer: 60000 * 0.25, // Default timer is 1 Minute
   unprepTimer: 60000 * 1.5, // Unprepared timer is 1.5 Minutes
   // - Vehicle
   // vehicleSaveTime: 60000 * 5, // 5 Minutes
   // Weather
   weatherCycleTime: 60000 * 5, // 5 Minutes
   weatherCycle: [
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
   // Time
   startHour: 6, // What time do we start the server at?
   minutesPerMinute: 5, // Used to set the Time Scale of the server for the minute. 1 Minute = 30 Minutes.
   hoursPerSixtyMinutes: 1, // Used to set the Time Scale of the server for the hour.
};
