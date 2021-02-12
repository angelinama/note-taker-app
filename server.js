// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Sets up the app to serve static files
app.use(express.static(path.join(__dirname, 'public'))); //for this assignment not important since we set up each route explicitly later, but usually this is the way to set up all the static files all together

//Data:all the notes stored in db/db.json
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => res.json(data));
//land any other undefined routes to index.html. Order matters! (any get routes defined after this line will still be routed to index.html)
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))); 
app.post('/api/notes', (req, res) => {
  newNote = req.body;
  // TODO unique id
  data.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(data));
  res.json(newNote);
});

// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


