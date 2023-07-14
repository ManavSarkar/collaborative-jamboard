const express = require("express");
const router = express();
const { customAlphabet } = require("nanoid");
router.get("/", (req, res) => {
  res.send("Hello from jamboard");
});

router.post("/create", (req, res) => {
  const title = req.body.title;
  const nanoid = customAlphabet("0123456789-qwertyuiopalskdjfhgzmxncbv", 10);
  const id = nanoid();

  res.status(200).send({ id, title });
});

module.exports = router;
