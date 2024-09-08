const localization = require('../utils/localization');
const userModel = require('../models/user');

let currentLang = 'en';  // Default language
let locale = localization.loadLocale(currentLang);  // Load default language

const QUOTE_REGEX = /"([^"]+)"|(\S+)/g;  // Matches quoted strings or regular words

module.exports = {
  handleCommand: async function(userId, message, mentionedUsers) {
    if (message.startsWith('!')) {
      const args = [];
      let match;
      while ((match = QUOTE_REGEX.exec(message.slice(1)))) {
        args.push(match[1] || match[2]);
      }

      const command = args.shift();  // Extract the command (first word)
      
      switch (command) {
        case 'ban':
          return await this.banUser(userId, args, mentionedUsers);
        case 'warn':
          return await this.warnUser(userId, args, mentionedUsers);
        case 'unban':
          return await this.unbanUser(userId, args, mentionedUsers);
        case 'setlang':
          return await this.setLanguage(userId, args);
        default:
          return { message: localization.translate('unknown_command', locale) };
      }
    }
    return { message: 'Not a command' };
  },

  setLanguage: async function(userId, args) {
    const role = await userModel.getRole(userId);
    if (role !== 'master') {
      return { message: 'Only master users can set the language.' };
    }

    const lang = args[0];
    try {
      locale = localization.loadLocale(lang);
      currentLang = lang;
      return { message: localization.translate('language_set', locale) };
    } catch (error) {
      return { message: `Language ${lang} is not supported.` };
    }
  },

  banUser: async function(userId, args, mentionedUsers) {
    const targetUser = mentionedUsers[args[0].replace('@', '')];
    await userModel.banUser(targetUser);
    return { message: localization.translate('ban_message', locale, { user: targetUser }) };
  },

  warnUser: async function(userId, args, mentionedUsers) {
    const targetUser = mentionedUsers[args[0].replace('@', '')];
    const warnings = await userModel.addWarning(targetUser);
    if (warnings >= 3) {
      await this.banUser(userId, args, mentionedUsers);  // Auto-ban after 3 warnings
    }
    return { message: localization.translate('warn_message', locale, { user: targetUser, warnings }) };
  },

  unbanUser: async function(userId, args, mentionedUsers) {
    const targetUser = mentionedUsers[args[0].replace('@', '')];
    await userModel.unbanUser(targetUser);
    return { message: localization.translate('unban_message', locale, { user: targetUser }) };
  }
};
