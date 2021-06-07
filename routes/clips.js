const express = require("express");
const Clip = require("../models/Clip");
const ClipHistory = require("../models/ClipHistory");

const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route   GET api/clip/:id
// @desc    Get user content, return it and then delete it from DB.
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const clipData = await Clip.findOne({ id: req.params.id })
      .select("content")
      .select("expires");

    if (clipData) {
      if (
        clipData.expires &&
        new Date(clipData.expires).getTime() <= new Date().getTime()
      ) {
        await Clip.findOneAndDelete({ id: req.params.id });
      } else if (!clipData.expires) {
        await Clip.findOneAndDelete({ id: req.params.id });
      }
    }

    res.send(clipData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error occured!! ", error: err });
  }
});

// @route   put api/clip/:id
// @desc    Update user content if already exist else Create new user content
// @access  Public
router.put(
  "/:id",
  [
    check("content", "Please include content").isLength({ min: 1 }),
    check("expiresAfter", "Please include expires time in seconds").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, expiresAfter } = req.body;
    const id = req.params.id;

    const clipData = {};
    clipData.content = content;
    clipData.expiresAfter = expiresAfter;
    clipData.createdAt = new Date();

    var created = new Date();
    if (expiresAfter !== 0) {
      clipData.expires = created.setSeconds(
        created.getSeconds() + expiresAfter
      );
    }

    try {
      await Clip.findOneAndUpdate(
        { id: id },
        { $set: clipData },
        {
          new: true,
          upsert: true,
        }
      );
      // await clipData.save();

      //Saving record of clips created
      try {
        const clipHistory = new ClipHistory({
          id,
          content,
          createdAt: clipData.createdAt,
        });
        await clipHistory.save();
      } catch (err1) {
        console.log("Error in clip history: " + err);
      }

      return res.json({ msg: "Clip created" });
    } catch (err) {
      console.log("Error: " + err);
      res.status(500).json({ msg: "Server error occured!! ", error: err });
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
