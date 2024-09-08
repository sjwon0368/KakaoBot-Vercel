const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commands');

// Handle incoming webhook requests
router.post('/', async (req, res) => {
  const { user_id, message, mentioned_users } = req.body;
  try {
    const response = await commandController.handleCommand(user_id, message, mentioned_users);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
