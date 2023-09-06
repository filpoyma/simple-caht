const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");

const dbConnect = require("./utils/dbConnect");
const wsConnect = require("./utils/wsConnect");

const server = require("http").createServer(app);

const port = process.env.PORT || 5000;

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

dbConnect();
wsConnect(server);

const users = require("./routes/users");
const chat = require("./routes/chat");

app.use("/users", users);
app.use("/chat", chat);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
