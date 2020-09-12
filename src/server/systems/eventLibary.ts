export const events = {
   system: {
      database: {
         init: "system::database:init",
      },
      lobby: {
         join: "system::lobby:join",
         leave: "system::lobby:leave",
         timerStart: "system::lobby:timerStart",
         timerStop: "system::lobby:timerStop",
         init: "system::lobby:init",
      },
   },
};
