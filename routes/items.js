const express = require("express")
const router = express.Router()
const Item = require("../models/item")

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create a new item
router.post("/", async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name })
  await newItem.save();
  res.status(201).json(newItem)
});

// Get a single item by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id)
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found")
  }
});

// Update a single item by id
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const item = await Item.findByIdAndUpdate(id, { name }, { new: true })
  if (item) {
    res.json(item)
  } else {
    res.status(404).send("Item not found")
  }
});

// Delete a single item by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id)
  if (item) {
    res.sendStatus(204);
  } else {
    res.status(404).send("Item not found")
  }
});

module.exports = router