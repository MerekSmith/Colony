const io = require("../index.js").io;
const roles = require("../client/src/assets/roles.json");

getPlayers = (room, readyReset = false) => {
  // Accessing the socket.io sockets that are associated with the room provided.
  const clients = io.sockets.adapter.rooms[room].sockets;

  //to get the number of clients
  // var numClients = typeof clients !== "undefined" ? Object.keys(clients).length : 0;

  // Intialize players array.
  let players = [];
  for (var clientId in clients) {
    //this is the socket of each client in the room.
    var clientSocket = io.sockets.connected[clientId];
    // If reset is true, reset all sockets to false for ready.
    readyReset ? (clientSocket.ready = false) : null;

    let player = {};
    player.id = clientSocket.id;
    player.name = clientSocket.name;
    player.connected = clientSocket.connected;
    player.room = room;
    player.ready = clientSocket.ready || false;

    players.push(player);

    //you can do whatever you need with this
    // clientSocket.emit("new event", "Updates");
  }
  return players;
};

assignRoles = (clients, socket) => {
  //  to get the number of clients
  var numClients =
    typeof clients !== "undefined" ? Object.keys(clients).length - 1 : 0;

  let randomRoles = [];
  let infectedCount = 0;
  // If playing with 6 players,
  const infectedLimit = numClients >= 6 ? 2 : 1;

  // We use numClients to get the players. Need 3 additional roles that are unused.
  for (let i = 0; randomRoles.length < numClients + 3; i++) {
    let index = (Math.random() * roles.length) | 0;
    if (index === 0 && infectedCount < infectedLimit) {
      infectedCount++;
      randomRoles.push(roles[index]);
    } else if (!randomRoles.includes(roles[index]) || index === 1) {
      randomRoles.push(roles[index]);
    }
  }
  // console.log("random roles", randomRoles);
  let roleIndex = 0;
  for (var clientId in clients) {
    //this is the socket of each client in the room.
    const clientSocket = io.sockets.connected[clientId];

    if (clientSocket.name !== "Moderator") {
      let role = randomRoles[roleIndex];
      roleIndex++;
      clientSocket.role = role;

      //you can do whatever you need with this
      // clientSocket.emit("new event", "Updates");
      console.log(
        `${clientSocket.name} is socket.role of ${clientSocket.role.roleName}`
      );
    }

    // emit to each unique socket within the room their specific role and that the game has started.
    clientSocket.emit("game has started", clientSocket.role);
  }
  // Remove the last 3 random roles and save them onto the Moderator socket for use later. These are extra roles in the game to make it more challenging to determine each players role.
  socket.extraRoles = randomRoles.slice(randomRoles.length - 3);
};

module.exports = function(socket) {
  // Joining a room logic
  socket.on("join room", (room, name) => {
    // Check if room exists. Emit error back to socket if room does not exist.
    if (
      name !== "Moderator" &&
      typeof io.sockets.adapter.rooms[room] === "undefined"
    ) {
      socket.emit("room error", true);
      return;
    }

    // set property of name on the socket to whatever the player provides on the join screen.
    socket.name = name;
    socket.room = room;
    socket.join(room);
    console.log(socket.name + " has joined room " + room);

    // Runs a function that puts together an array of player objects with their name and socket.id
    const players = getPlayers(room);
    const playerCount = players.length - 1;

    // emit back to everyone in the room that was just joined the new full player array.
    io.to(room).emit("joined", { players, room, playerCount });
  });
  // End join room logic

  socket.on("disconnect", () => {
    const { room } = socket;
    if (typeof room !== "undefined") {
      // Runs a function that puts together an array of player objects with their name and socket.id
      const players = getPlayers(room);
      const playerCount = players.length - 1;

      // emit back to everyone in the room that is still in the room.
      io.to(room).emit("joined", { players, room, playerCount });
    }
  });

  socket.on("start game", room => {
    // Accessing the socket.io sockets that are associated with the room provided.
    const clients = io.sockets.adapter.rooms[room].sockets;

    assignRoles(clients, socket);

    // io.to(room).emit("game has started", socket.name);
  });

  socket.on("ready to play", room => {
    socket.ready = true;

    let players = getPlayers(room);

    // Loop through players to see if all are ready.
    let readyCount = 0;
    let allReadyToPlay = false;
    players.forEach(player => {
      player.ready || player.name === "Moderator" ? readyCount++ : null;
    });

    readyCount === players.length
      ? (allReadyToPlay = true)
      : (allReadyToPlay = false);

    if (allReadyToPlay) {
      let readyReset = true;
      players = getPlayers(room, readyReset);
    }
    io.to(room).emit("player is ready", players, allReadyToPlay);
  });

  socket.on("review roles", (room, requestType, fn) => {
    // Accessing the socket.io sockets that are associated with the room provided.
    const clients = io.sockets.adapter.rooms[room].sockets;
    const { name } = socket;

    // Intialize infected array.
    let revealPlayerList = [];
    let extraRoleList = [];
    let i = 1;

    for (var clientId in clients) {
      //this is the socket of each client in the room.
      let clientSocket = io.sockets.connected[clientId];
      let player = {};

      switch (requestType) {
        case "Moderator":
          if (clientSocket.name !== "Moderator") {
            player.name = clientSocket.name;
            player.roleName = clientSocket.role.roleName;
            revealPlayerList.push(player);
          } else {
            clientSocket.extraRoles.forEach(role => {
              let extraRole = {};
              extraRole.name = `Extra Role ${i}`;
              extraRole.roleName = role.roleName;
              i++;
              extraRoleList.push(extraRole);
            });
          }
          break;

        case "Scientist":
          if (clientSocket.name !== "Moderator" && clientSocket.name !== name) {
            player.name = clientSocket.name;
            player.roleName = clientSocket.role.roleName;
            player.isRevealed = false;
            revealPlayerList.push(player);
          } else if (clientSocket.name === "Moderator") {
            clientSocket.extraRoles.forEach(role => {
              let extraRole = {};
              extraRole.name = `Extra Role ${i}`;
              extraRole.roleName = role.roleName;
              extraRole.isRevealed = false;
              i++;
              extraRoleList.push(extraRole);
            });
          }
          break;

        default:
          if (clientSocket.name !== "Moderator") {
            if (
              clientSocket.role.roleName === "Infected" &&
              clientSocket.name !== name
            ) {
              player.name = clientSocket.name;
              revealPlayerList.push(player);
            }
          }
          break;
      }
    }

    fn(revealPlayerList, extraRoleList);
  });

  socket.on("power confirmed", room => {
    socket.ready = true;

    let players = getPlayers(room);

    // Loop through players to see if all are ready.
    let readyCount = 0;
    let allConfirmed = false;
    players.forEach(player => {
      player.ready || player.name === "Moderator" ? readyCount++ : null;
    });

    readyCount === players.length
      ? (allConfirmed = true)
      : (allConfirmed = false);

    if (allConfirmed) {
      let readyReset = true;
      players = getPlayers(room, readyReset);
    }
    io.to(room).emit("power is confirmed", players, allConfirmed);
  });

  socket.on("start talking phase", room => {
    let timer = 60;
    roundTimer = () => {
      if (timer === 0) {
        clearInterval(intervalTimer);
        io.to(room).emit("time to vote");
        timer = "0";
      }
      io.to(socket.id).emit("timer", timer);
      timer--;
    };
    let intervalTimer;
    intervalTimer = setInterval(roundTimer, 1000);
  });

  socket.on("player voted", (room, votedName) => {
    const clients = io.sockets.adapter.rooms[room].sockets;
    socket.voted = votedName;

    let fullPlayerList = [];
    let votedCount = 0;
    let voteCount = [];
    let moderatorSocket;
    for (var clientId in clients) {
      //this is the socket of each client in the room.
      var clientSocket = io.sockets.connected[clientId];
      if (clientSocket.name === "Moderator") {
        moderatorSocket = clientSocket.id;
      } else {
        let player = {};
        player.name = clientSocket.name;
        player.role = clientSocket.role.roleName;
        player.voted = clientSocket.voted || false;
        if (typeof clientSocket.voted !== "undefined") {
          votedCount++;
        }
        fullPlayerList.push(player);
      }
    }

    io.to(room).emit("vote update", fullPlayerList, votedCount);
  });

  socket.on("all have voted", room => {
    io.to(room).emit("all voted");
  });
};
