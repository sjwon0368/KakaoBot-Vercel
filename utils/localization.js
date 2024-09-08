const fs = require('fs');
const path = require('path');

// Load translations from a locale file
function loadLocale(lang) {
  const filePath = path.join(__dirname, `../locales/${lang}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } else {
    throw new Error(`Locale file for ${lang} not found.`);
  }
}

// Simple function to replace placeholders in translation strings
function translate(key, locale, data = {}) {
  let translation = locale[key];
  if (!translation) return key;  // Fallback to the key if translation doesn't exist

  Object.keys(data).forEach((placeholder) => {
    const regex = new RegExp(`{${placeholder}}`, 'g');
    translation = translation.replace(regex, data[placeholder]);
  });

  return translation;
}

module.exports = { loadLocale, translate };
