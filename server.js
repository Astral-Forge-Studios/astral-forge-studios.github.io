const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static('public'));

const players = {};
let playerCount = 0;

io.on('connection', (socket) => {
  if (playerCount >= 10) {
    socket.emit('gameFull');
    socket.disconnect();
    return;
  }

  playerCount++;
  players[socket.id] = {
    id: socket.id,
    x: Math.random() * 100,
    y: 0,
    z: Math.random() * 100,
    health: 100,
    username: `Player${playerCount}`
  };

  socket.emit('playerSpawn', { 
    id: socket.id, 
    position: { x: players[socket.id].x, y: players[socket.id].y, z: players[socket.id].z }
  });

  io.emit('playerList', Object.values(players));

  socket.on('playerUpdate', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.position.x;
      players[socket.id].y = data.position.y;
      players[socket.id].z = data.position.z;
      socket.broadcast.emit('playerUpdate', {
        id: socket.id,
        position: data.position
      });
    }
  });

  socket.on('shoot', (data) => {
    socket.broadcast.emit('bulletFired', {
      from: socket.id,
      direction: data.direction,
      position: data.position
    });
  });

  socket.on('damage', (data) => {
    if (players[data.targetId]) {
      players[data.targetId].health -= data.amount;
      io.emit('playerDamaged', { playerId: data.targetId, health: players[data.targetId].health });
      
      if (players[data.targetId].health <= 0) {
        io.emit('playerDied', { playerId: data.targetId, killedBy: socket.id });
        players[data.targetId].health = 100;
      }
    }
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    playerCount--;
    io.emit('playerDisconnected', { id: socket.id });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`FPS Server running on port ${PORT}`);
});
