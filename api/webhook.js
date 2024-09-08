const commandController = require('../controllers/commands');
const { loadLocale } = require('../utils/localization');
require('dotenv').config();  // Load environment variables

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { user_id, message, mentioned_users } = req.body;

    try {
      const response = await commandController.handleCommand(user_id, message, mentioned_users);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error processing command:", error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
