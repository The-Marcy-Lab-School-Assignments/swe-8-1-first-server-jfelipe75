// import express
const express = require("express");

// invoke express to create our app
const app = express();

// The path module is useful for constructing relative filepaths
const path = require("path");
// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../app/dist/");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};
// register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// controllers
const serverJoke = (req, res) => {
  const joke =
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾😆";
  res.send(joke);
};

const serverPicture = (req, res) => {
  const src = {
    src: "https://static.wikia.nocookie.net/naruto/images/d/dc/Naruto%27s_Sage_Mode.png/revision/latest?cb=20150124180545",
  };

  res.send(src);
};

const serverRollDie = (req, res) => {
  const { quantity } = req.query;
  let numRolls = 1;

  if (quantity) {
    const parsedQuantity = parseInt(quantity, 10);

    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      numRolls = parsedQuantity;
    } else {
      numRolls = 1;
    }
  }
  // Function to generate a random number
  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  // Generate an array of dice rolls based on the number of rolls
  const rolls = Array.from({ length: numRolls }, rollDie);

  // Send the response in the required structure
  res.send({ rolls });
};

// endpoints
app.get("/api/joke", serverJoke);
app.get("/api/picture", serverPicture);
app.get("/api/rollDie", serverRollDie);

// set up port
const PORT = 8080;
// listen for requests
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
