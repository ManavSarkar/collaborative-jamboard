const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("Hello from jamboard");
});

router.post("/create", (req, res) => {
  const title = req.body.title;

  res.status(200).json({ success: true, message: "Jamboard created" });
});

module.exports = router;
