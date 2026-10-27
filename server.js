// 1. Load Express and create the app
  const express = require('express');
  const { Server } = require('socket.io');
  const app = express();

  // 2. Send any file in the public folder when a browser asks for it
  app.use(express.static('public'));

  // 3. Use the host's port if it gives one, otherwise 3000 on your own machine
  const port = process.env.PORT || 3000;

  // 4. Start listening, and keep the server so Socket.io can attach to it
  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // 5. Attach Socket.io to the same server
  const io = new Server(server);

  // The one shared list of circles
  let circles = [];

  io.on('connection', (socket) => {
    // Send the newcomer what's already on the canvas
    socket.emit('circles', circles);

    socket.on('click', (pos) => {
      let removed = false;

      for (let i = circles.length - 1; i >= 0; i--) {
        const c = circles[i];
        if (Math.hypot(c.x - pos.x, c.y - pos.y) < c.r) {
          circles.splice(i, 1);
          removed = true;
          break;
        }
      }

      if (!removed) {
        circles.push({
          x: pos.x,
          y: pos.y,
          r: 30,
          color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
        });
      }

      io.emit('circles', circles);
    });
  });