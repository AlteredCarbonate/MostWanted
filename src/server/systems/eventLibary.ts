export const events = {
   system: {
      database: {
         init: "system::database:init",
      },
      game: {
         setState: "system::game:setState",
         setReady: "system::game:setReady",
         start: "system::game:start",
         stop: "system::game:stop",
      },
      lobby: {
         join: "system::lobby:join",
         leave: "system::lobby:leave",
         timerStart: "system::lobby:timerStart",
         timerStop: "system::lobby:timerStop",
         init: "system::lobby:init",
         exit: "system::lobbby:exit",
      },
   },
};
