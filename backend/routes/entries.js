const express = require("express");
const router = express.Router();
const Entry = require("../models/entry");

// @route   GET entries/
// @desc    Returns the diary entries
router.get("/", function(req, res, next) {
  Entry.find({}, (err, entries) => {
    res.json(entries);
  });
});

// @route   GET entries/
// @desc    Returns the diary entries
router.post("/test", function(req, res, next) {
  console.log(req.body);
});

// @route   POST api/users/test
// @desc    Tests users route
router.post("/entry", (req, res) => {
  Entry.findOne({ date: req.body.date }).then(entry => {
    if (entry) {
      console.log("update entry");
    } else {
      const newEntry = new Entry({
        uid: req.body.uid,
        date: Date.now(),
        start_bed: req.body.start_bed,
        start_sleep: req.body.start_sleep,
        end_sleep: req.body.end_sleep,
        end_bed: req.body.end_bed,
        awake: req.body.awake,
        description: req.body.description,
        rating: req.body.rating
      });

      newEntry
        .save()
        .then(entry => res.json(entry))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
