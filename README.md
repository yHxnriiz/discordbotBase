# Discord Bot Base

This project serves as a base to help you create your own Discord bot using [discord.js](https://discord.js.org/). The initial setup does not include database configuration; you will need to add that according to your project's needs.

## Setup Instructions

### 1. Install Dependencies

To get started, you need to install the required dependencies. Run the following command in your terminal:

```bash
npm install
```

This will install all the libraries listed in the `package.json` file, including `discord.js` and other essential tools.

### 2. Configure the `.env` File

The bot requires sensitive configurations, like the bot token, stored in a `.env` file. To do this:

1. Copy the contents of the `example.env` file into a new file called `.env`.
2. Replace the example values with your actual configuration, such as your bot token.

Example of a `.env` file:
```bash
TOKEN=your-token-here
DEVELOPERS=your-id    #To add more than 1 developer, put "," between the ids. Ex: 123456,654321
```

**Note:** Never share your `.env` file in public repositories.

### 3. Running the Bot

You can start the bot in two ways:

- **Production Mode** (runs the bot normally):
  
  ```bash
  npm start
  ```

- **Development Mode** (uses `nodemon` to automatically restart the bot when code changes):
  
  ```bash
  npm run dev
  ```

### 4. Customizing the Bot

- **Add your logic to the `index.js` file** or split the code into multiple files for better organization.
- If you need additional functionality (such as database integration), you can install extra packages using `npm`. For example:

```bash
npm install mongoose  # For MongoDB
npm install mysql2    # For MySQL
```

### 5. Project Structure

Below is a basic structure of how the project is organized:

```
/src
  ├── commands      # Directory to store bot commands
  ├── events        # Directory for events (e.g., ready, messageCreate)
  ├── index.js      # Main bot file
.env                # Environment variables file (not included in the repo)
example.env         # Example .env file
package.json        # Project dependency configuration
```

Feel free to modify or expand the directory structure as needed for your project.

### 6. System Requirements

This project requires Node.js version **16.9.0 or higher**. You can download the latest version from the [official Node.js website](https://nodejs.org/).

### 7. Best Practices

- **Code Maintenance:** For larger projects, it is advisable to split your commands and events into separate files, making your code easier to maintain and scale.
  
- **Error Handling:** Always include `try/catch` blocks to handle unexpected errors and improve the user experience.

- **Security:** Avoid sharing your token or other sensitive data, such as database credentials. Consider using services like [GitGuardian](https://www.gitguardian.com/) to detect credential leaks.

### 8. Database Integration

This base project does not include database integration. If your bot needs to store information, such as user stats or event logs, you'll need to integrate a database like MongoDB, MySQL, or another of your choice.

### License

This project is licensed under the [MIT License](https://opensource.org/license/mit). Feel free to use and modify the code as needed.

---

## FAQ

### How do I add new commands to the bot?

1. Create a `.js` file in the `src/commands` folder.
2. Define the command using `module.exports` with the correct structure.
3. The bot automatically loads commands from this folder when it starts.
4. The ready (status) event is located in `index.js`.
5. This base will be updated periodically, with improvements over time.

### How can I configure intents?

Intents define what the bot can or cannot listen to. To configure additional intents:

1. Edit the `index.js` file or the main file where the Discord client is instantiated.
2. Add or remove intents in the `intents` array as per your needs.

Example:

```javascript
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
```

### What to do if the bot is not responding?

- Check if the token in the `.env` file is correct.
- Ensure the bot has the necessary permissions in the server.
- Look at the console logs to identify any potential errors.