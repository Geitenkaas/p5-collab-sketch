  // 1. Load Express and create the app
  const express = require('express');   // load the library from node_modules
  const app = express();                // calling it creates your server app

  // 2. Send any file in the public folder when a browser asks for it
  app.use(express.static('public'));

  // 3. Use the host's port if it gives one, otherwise 3000 on your own machine
  const port = process.env.PORT || 3000;

  // 4. Start listening for requests
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });