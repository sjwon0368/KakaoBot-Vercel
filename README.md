# KakaoTalk Bot

A KakaoTalk bot built with Node.js for managing user roles, warnings, and bans.

## Features
- Role-based command handling (ban, warn, unban, etc.)
- SQLite database for persistent storage
- Webhook-based message processing
- Localization support (English, Spanish)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kakao-bot.git
   cd kakao-bot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your KakaoTalk API key:
   ```env
   KAKAO_API_KEY=your_kakao_api_key
   PORT=3000
   ```
4. Run the bot:
   ```bash
   npm start
   ```
## Deployment
To deploy the bot on Heroku or any cloud platform, ensure the following:

Set up the environment variables on the platform (e.g., `KAKAO_API_KEY`).
Ensure the `Procfile` is properly configured.
Push your code to the platform and start the app.
## License
This project is licensed under the MIT License.




## Step-by-Step Guide to Create the Project and Publish:

### 1. **Create the Project using npm**

1. **Initialize npm**: Run this in your project directory to create `package.json`:
   ```bash
   npm init -y
   ```
2. **Install dependencies**:
   ```bash
   npm install express body-parser sqlite3 axios dotenv
   ```
3. **Create Folder Structure**: Manually create the folders and files according to the structure provided above.
4. **Create** `.env`: Add your KakaoTalk API key in the `.env` file.
5. **Run the bot locally**:
   ```bash
   npm start
   ```
### 2. **Publish Your Bot to Heroku (or Other Cloud Providers)**
1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```
   *or*
   
   ```bash
   npm i -g heroku
   ```
3. **Log in to Heroku**:
   ```bash
   heroku login
   ```
4. **Create a New Heroku App**:
   ```bash
   heroku create your-bot-name
   ```
5. **Set Environment Variables in Heroku**:
   ```bash
   heroku config:set KAKAO_API_KEY=your_kakao_api_key
   ```
6. **Push Code to Heroku**:
   ```bash
   git add .
   git commit -m "Initial bot commit"
   git push heroku master
   ```
7. **Open the App**:
   ```bash
   heroku open
   ```
Now your KakaoTalk bot is up and running in production!
