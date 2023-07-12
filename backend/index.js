const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();

const database = require("./database/database");
const userRouter = require("./routes/user");
const jamboardRouter = require("./routes/jamboard");

const chatSocket = require("./socket/chat");
const jamboardSocket = require("./socket/jamboard");
const voicechatSocket = require("./socket/voice_chat");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/jamboard", jamboardRouter);
app.use("/chating", chatSocket);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
