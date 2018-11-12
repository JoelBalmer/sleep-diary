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

// @route   GET entries/uid
// @desc    Returns entries for the given user
router.get("/:uid", (req, res, next) => {
  Entry.find({ uid: req.params.uid })
    .sort({ date: "asc" })
    .then(entries => {
      res.json(entries);
    });
});

// @route   GET entries/entry
// @desc    Returns a diary entry
router.get("/entry/:date", function(req, res, next) {
  Entry.findOne({ date: req.params.date }).then(entry => {
    res.json(entry);
  });
});

// @route   DELETE entries/entry
// @desc    Deletes a diary entry
router.delete("/entry", (req, res) => {
  Entry.findOne({ date: req.body.date }).then(entry => {
    entry
      .remove()
      .then(savedEntry => res.send(`Removed entry for: ${req.body.date}`))
      .catch(err => console.log(`Here's the error: ${err}`));
  });
});

// @route   POST api/users/test
// @desc    Update entry
router.post("/entry", (req, res) => {
  const bodyObject = {
    uid: req.body.uid,
    date: req.body.date,
    start_bed: req.body.start_bed,
    start_sleep: req.body.start_sleep,
    end_sleep: req.body.end_sleep,
    end_bed: req.body.end_bed,
    awake: req.body.awake,
    description: req.body.description,
    rating: req.body.rating
  };

  Entry.findOne({ date: req.body.date }).then(entry => {
    if (entry) {
      Object.assign(entry, bodyObject);
      entry
        .save()
        .then(savedEntry => res.json(savedEntry))
        .catch(err => console.log(`Here's the error: ${err}`));
    } else {
      const newEntry = new Entry(bodyObject);
      newEntry
        .save()
        .then(entry => res.json(entry))
        .catch(err => console.log(`Here's the error: ${err}`));
    }
  });
});

module.exports = router;
