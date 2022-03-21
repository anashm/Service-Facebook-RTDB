const mongoose = require("mongoose");
const express = require("express");
const configs = require("./configs");
const app = express();

const socket = require("./socket");

console.debug("[Mongo] Connecting @");
mongoose.connect(
  "mongodb://127.0.0.1:27017/facebook_fetch_service_client_db?replicaSet=rs0&retryWrites=false",
  {
    useNewUrlParser: true,
  }
);

socket.start();

app.listen(configs.PORT, () => {
  console.log("[Server] Listening on port:", configs.PORT);
});
