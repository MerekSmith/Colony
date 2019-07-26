const io = require("../index.js").io;

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
    socket.join(room);
    console.log(socket.name + " has joined room " + room);

    // Accessing the socket.io sockets that are associated with the room provided.
    const clients = io.sockets.adapter.rooms[room].sockets;

    //to get the number of clients
    // var numClients = typeof clients !== "undefined" ? Object.keys(clients).length : 0;

    // Intialize players array.
    let players = [];
    for (var clientId in clients) {
      //this is the socket of each client in the room.
      var clientSocket = io.sockets.connected[clientId];
      let player = {};
      player.id = clientSocket.id;
      player.name = clientSocket.name;
      player.connected = clientSocket.connected;
      player.room = room;

      players.push(player);
      //you can do whatever you need with this
      // clientSocket.emit("new event", "Updates");
    }

    // emit back to everyone in the room that was just joined the new full player array.
    io.to(room).emit("joined", { players, room });
  });
  // End join room logic
};
