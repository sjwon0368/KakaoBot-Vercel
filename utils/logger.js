const fs = require('fs');
const path = require('path');

// Basic logger utility to log events and errors
module.exports = {
  logEvent: function(message) {
    const logPath = path.join(__dirname, '../logs/events.log');
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) console.error("Error logging event: " + err);
    });
  },

  logError: function(message) {
    const logPath = path.join(__dirname, '../logs/errors.log');
    const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFile(logPath, logMessage, (err) => {
      if (err) console.error("Error logging error: " + err);
    });
  }
};
