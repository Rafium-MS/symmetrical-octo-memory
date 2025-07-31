const express = require('express');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'database.sqlite');
const JSON_PATH = path.join(__dirname, 'data.json');

app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS editor_data (
    id INTEGER PRIMARY KEY,
    content TEXT,
    title TEXT,
    characters TEXT,
    locations TEXT,
    plotPoints TEXT
  )`);
});

app.get('/data', (req, res) => {
  db.get('SELECT * FROM editor_data WHERE id = 1', (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'database error' });
    }
    if (row) {
      res.json({
        content: row.content || '',
        title: row.title || '',
        characters: JSON.parse(row.characters || '[]'),
        locations: JSON.parse(row.locations || '[]'),
        plotPoints: JSON.parse(row.plotPoints || '[]')
      });
    } else {
      // Fallback to JSON file
      fs.readFile(JSON_PATH, 'utf8', (err, data) => {
        if (err) {
          return res.json({ content: '', title: '', characters: [], locations: [], plotPoints: [] });
        }
        try {
          res.json(JSON.parse(data));
        } catch (e) {
          res.json({ content: '', title: '', characters: [], locations: [], plotPoints: [] });
        }
      });
    }
  });
});

app.post('/data', (req, res) => {
  const { content, title, characters, locations, plotPoints } = req.body;
  const data = { content, title, characters, locations, plotPoints };

  // Save to JSON file
  fs.writeFile(JSON_PATH, JSON.stringify(data, null, 2), err => {
    if (err) console.error('Error writing JSON file', err);
  });

  const chars = JSON.stringify(characters || []);
  const locs = JSON.stringify(locations || []);
  const plots = JSON.stringify(plotPoints || []);

  db.serialize(() => {
    db.get('SELECT id FROM editor_data WHERE id = 1', (err, row) => {
      if (row) {
        db.run(
          'UPDATE editor_data SET content=?, title=?, characters=?, locations=?, plotPoints=? WHERE id=1',
          [content, title, chars, locs, plots]
        );
      } else {
        db.run(
          'INSERT INTO editor_data (id, content, title, characters, locations, plotPoints) VALUES (1,?,?,?,?,?)',
          [content, title, chars, locs, plots]
        );
      }
    });
  });
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
