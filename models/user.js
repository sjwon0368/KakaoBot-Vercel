const db = require('../database/db');

module.exports = {
  addWarning: function(userId) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT OR IGNORE INTO warnings (user_id, warning_count) VALUES (?, 0)`, [userId], function(err) {
        if (err) return reject(err);
        db.run(`UPDATE warnings SET warning_count = warning_count + 1 WHERE user_id = ?`, [userId], function(err) {
          if (err) return reject(err);
          db.get(`SELECT warning_count FROM warnings WHERE user_id = ?`, [userId], function(err, row) {
            if (err) return reject(err);
            resolve(row.warning_count);
          });
        });
      });
    });
  },

  banUser: function(userId) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO banned_users (user_id) VALUES (?)`, [userId], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  unbanUser: function(userId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM banned_users WHERE user_id = ?`, [userId], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  getRole: function(userId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT role FROM users WHERE user_id = ?`, [userId], function(err, row) {
        if (err) return reject(err);
        resolve(row ? row.role : 'user');
      });
    });
  },

  setRole: function(userId, role) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT OR REPLACE INTO users (user_id, role) VALUES (?, ?)`, [userId, role], function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  getAllRoles: function() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT user_id, role FROM users`, function(err, rows) {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
};
