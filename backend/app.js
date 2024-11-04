const bodyParser = require("body-parser");
const express = require("express");
const { v4: generateId } = require("uuid"); 
 
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

let notes = [];

// NEW NOTE to /api/notes
app.post("/api/notes", (req, res, next) => {
  try {
    const newNote = {
      id: generateId(),
      ...req.body
    };

    notes.push(newNote);

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
});

// GET ALL
app.get("/api/notes", (req, res, next) => {
  try {
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

// GET SINGLE NOTE /api/notes/:id
app.get("/api/notes/:id", (req, res, next) => {
  try {
    const note = notes.find(ev => ev.id === req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
});

// Update note /api/notes/:id
app.patch("/api/notes/:id", (req, res, next) => {
  try {
    const index = notes.findIndex(ev => ev.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: "Note not found." });
    }

    const updatedNote = { ...notes[index], ...req.body };
    notes[index] = updatedNote;

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(8080, () => console.log("Your express server app! Listens on port 8080!"));
