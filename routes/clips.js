const express = require("express");
const Clip = require("../models/Clip");

const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   GET api/clip/:id
// @desc    Get user content, return it and then delete it from DB.
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const clipData = await Clip.find({ id: req.params.id }).select("content");
    res.json(clipData);
    await Clip.findOneAndDelete({ id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/clip/:id
// @desc    Delete user content if already exist and Create new user content
// @access  Public
router.post(
  "/:id",
  [check("content", "Please include some content").isLength({ min: 1 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    const id = req.params.id;

    const clipData = new Clip({ id, content });

    try {
      await Clip.findOneAndDelete({ id: id });
      await clipData.save();

      return res.status(201).json({ msg: "Clip created" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/*
// @route     DELETE api/clip/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", async (req, res) => {
  try {
    let clipData = await Clip.findById(req.params.id);

    if (!clipData) return res.status(404).json({ msg: "Clip not found" });

    await Clip.findOneAndDelete({ id: req.params.id });

    res.json({ msg: "Clip removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
*/

module.exports = router;
