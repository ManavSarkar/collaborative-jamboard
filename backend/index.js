const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
dotenv.config();
const app = express();

const database = require("./database/database");
const userRouter = require("./routes/user");
const jamboardRouter = require("./routes/jamboard");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://collaborative-jamboard.vercel.app",

      "https://collaborative-jamboard-frontend.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

// importing sockets
const chatSocket = require("./socket/chat");
const jamboardSocket = require("./socket/jamboard");
const voiceChatSocket = require("./socket/voice_chat");

// using sockets
chatSocket(io);
jamboardSocket(io);
voiceChatSocket(io);

app.use("/api/user", userRouter);
app.use("/api/jamboard", jamboardRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
