const sqlite3 = require('sqlite3').verbose();
const { dbPath } = require('../config/config');

// Initialize SQLite connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database: " + err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Initialize tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            role TEXT
          )`);

  db.run(`CREATE TABLE IF NOT EXISTS warnings (
            user_id TEXT PRIMARY KEY,
            warning_count INTEGER DEFAULT 0
          )`);

  db.run(`CREATE TABLE IF NOT EXISTS banned_users (
            user_id TEXT PRIMARY KEY
          )`);
});

module.exports = db;
