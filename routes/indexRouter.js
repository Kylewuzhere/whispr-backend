const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("index route");
});

module.exports = router;
