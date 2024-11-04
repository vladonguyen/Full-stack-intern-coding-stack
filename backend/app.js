const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs/promises");
const { v4: generateId } = require("uuid"); 
 
const app = express();
app.use(bodyParser.json());
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// NEW NOTE to /api/notes
app.post("/api/notes", async (req, res, next) => {
    try {
      // Read existing notes
      const data = await fs.readFile("notes.json", "utf8");
      const storedData = JSON.parse(data); // Parse the data into an object
      const notes = storedData.notes || []; // Access the notes array or initialize it as empty
   
      // Create a new note object
      const newNote = {
        id: generateId(), // Generate a unique ID for the new note
        ...req.body // Spread the request body properties into the new note
      };
   console.log("newNote", newNote)
      // Add the new note to the notes array
      notes.push(newNote);
   
      // Write the updated notes back to notes.json
      await fs.writeFile("notes.json", JSON.stringify({ notes }, null, 2)); // Save the object structure back
   
      // Send a success response with the newly created note
      res.status(201).json(newNote); // 201 Created status
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  });
 
// GET ALL
app.get("/api/notes", async (req, res, next) => {
  try {
    const data = await fs.readFile("notes.json", "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    next(error); 
  }
});
 
// GET SINGLE NOTE /api/notes/:id
app.get("/api/notes/:id", async (req, res, next) => {
  try {
    const data = await fs.readFile("notes.json", "utf8");
    const storedData = JSON.parse(data);
    const note = storedData.notes.find(ev => ev.id === req.params.id);
 
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
 
    res.json(note);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});
 

 
// Update note /api/notes/:id
app.patch("/api/notes/:id", async (req, res, next) => {
  try {
    // Read existing notes
    const data = await fs.readFile("notes.json", "utf8");
    const storedData = JSON.parse(data); // Parse the data into an object
    const notes = storedData.notes || []; // Access the notes array
 
    // Find the note to update
    const index = notes.findIndex(ev => ev.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: "Note not found." });
    }
 
    // Update the note with new data
    const updatedNote = { ...notes[index], ...req.body };
    notes[index] = updatedNote;
 
    // Write the updated notes back to notes.json
    await fs.writeFile("notes.json", JSON.stringify({ notes }, null, 2)); // Save the object structure back
 
    // Send a success response with the updated note
    res.json(updatedNote);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});
 
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace to the console
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
 
// Start server
app.listen(8080, () => console.log("Your express server app! Listens on port 8080!"));