const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});


router.post("/", async (req, res) => {
  const book = new Book(req.body);
  const saved = await book.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
