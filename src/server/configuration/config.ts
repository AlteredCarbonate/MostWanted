export const Config = {
  // Spawn Location / Camera Point
  characterPoint: {
    x: 2827.42333984375,
    y: -729.071044921875,
    z: 1.9250786304473877,
  },
  characterCamPoint: {
    x: 2826.87939453125,
    y: -723.9521484375,
    z: 1.98758864402771,
  },
  defaultSpawnPoint: {
    x: -725.7460327148438,
    y: -282.2967224121094,
    z: 36.959503173828125,
  },
  // Player Data
  defaultPlayerCash: 500.0, // Starting Cash
  // Timers
  // - Player
  timeRewardTime: 60000 * 5, // How much time before a reward point is added.
  timePlayerSaveTime: 60000 * 2, // How many minutes before we save all player data.
  timeRefreshContactsTime: 60000, // Every 1 Minute; Refresh Player Contacts
  // - Vehicle
  vehicleSaveTime: 60000 * 5, // 5 Minutes
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
