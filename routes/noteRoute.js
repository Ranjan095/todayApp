/** @format */

const express = require("express");
const noteRoute = express.Router();
const { NoteModel } = require("../models/noteModel");

noteRoute.post("/create", async (req, res) => {
  try {
    let newNote = new NoteModel(req.body);
    await newNote.save();
    res.send("new note has been created");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRoute.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorId: req.body.authorId });
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send(err);
  }
});

noteRoute.patch("/update/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOne({ _id: noteId });
  try {
    if (note.authorId !== req.body.authorId) {
      res
        .status(200)
        .send({ msg: "you'r not authorize person to update this" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
      res.status(200).send({ msg: `note id with ${noteId} is updated` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
noteRoute.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOne({ _id: noteId });
  try {
    if (note.authorId !== req.body.authorId) {
      res
        .status(200)
        .send({ msg: "you'r not authorize person to Delete this" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteId });
      res.status(200).send({ msg: `note id ${noteId} is deleted` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { noteRoute };
