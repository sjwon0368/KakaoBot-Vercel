require('dotenv').config();  // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  // Parse incoming JSON requests

// Webhook route
app.use('/webhook', webhookRoutes);

app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`);
});
