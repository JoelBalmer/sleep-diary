var express = require("express");
var router = express.Router();

/* GET entries page. */
router.get("/", function(req, res, next) {
  res.json({
    date: Date.now(),
    start_bed: 10,
    start_sleep: 20,
    end_sleep: 70,
    end_bed: 80,
    awake: 20
  });
});

module.exports = router;
