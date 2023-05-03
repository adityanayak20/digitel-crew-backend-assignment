const express = require("express")
const app = express()
const port = 3000

const mongoose = require("mongoose")
const Item = require("./models/item")
mongoose
  .connect("mongodb://localhost/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const itemRoutes = require("./routes/items")
app.use("/items", itemRoutes)



io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});