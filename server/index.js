// import express
const express = require("express");

// invoke express to create our app
const app = express();

// set up port
const PORT = 8080;

// controllers
const serverJoke = (req, res) => {
  const joke =
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾😆";
};

const serverPicture = (req, res) => {
  const src = {
    src: "https://static.wikia.nocookie.net/naruto/images/d/dc/Naruto%27s_Sage_Mode.png/revision/latest?cb=20150124180545",
  };

  res.send(src);
};

const serverRollDie = (req, res) => {
  const { quantity } = req.query;
  const rolls = { rolls: [] };

  if (!quantity) {
    res.send([4]);
  } else if (typeof quantity !== "number") {
    res.send([2]);
  }

  res.send([quantity]);
};

// endpoints
app.get("/api/joke");
app.get("/api/picture");
app.get("/api/rollDie");
// listen for requests
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
