const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Centralized logging system
const logs = {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
    warn: (message) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`)
};

// Ensure TOKEN exists in .env
if (!process.env.TOKEN) {
    logs.error('Token not found in .env file, bot will terminate.');
    process.exit(1);
}

// Instantiate Discord client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ],
});

// Collections for commands, events, and cooldowns
client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.logs = logs;

// Recursive function to load commands
const loadCommands = (dir = './src/commands') => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
        const filePath = path.join(__dirname, dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            loadCommands(`${dir}/${file}`);
        } else if (file.endsWith('.js')) {
            const command = require(filePath);
            if (command?.name) {
                client.commands.set(command.name, command);
                if (command?.aliases?.length) {
                    command.aliases.forEach(alias => client.commands.set(alias, command));
                }
            } else {
                logs.warn(`Command without a name found in ${file}.`);
            }
        }
    }
};

// Recursive function to load events
const loadEvents = (dir = './src/events') => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
        const filePath = path.join(__dirname, dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            loadEvents(`${dir}/${file}`);
        } else if (file.endsWith('.js')) {
            const event = require(filePath);
            if (event?.name) {
                client[event.once ? 'once' : 'on'](event.name, (...args) => event.execute(...args, client));
            } else {
                logs.warn(`Event without a name found in ${file}.`);
            }
        }
    }
};

// Function to reload commands at runtime
client.reloadCommands = () => {
    logs.info('Reloading commands..');
    client.commands.clear();
    loadCommands();
};

// Handle errors
client.on('error', (err) => logs.error(`Error detected: ${err.message}`));
client.on('shardError', (err) => logs.error(`Shard error: ${err.message}`));
client.on('disconnect', () => logs.warn('The bot was disconnected.'));

// Graceful shutdown for SIGINT or SIGTERM signals
process.on('SIGINT', () => {
    logs.warn('Received SIGINT signal, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});
process.on('SIGTERM', () => {
    logs.warn('Received SIGTERM signal, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Once the bot is online
client.once('ready', () => {
    logs.info(`Client ${client.user.tag} online successfully`);
    client.user?.setPresence({ activities: [{ name: 'Henrizin', type: ActivityType.Listening }], status: 'idle' });
});

// Function to track bot statistics
setInterval(() => {
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    logs.info(`Memory usage: ${memoryUsage} MB`);
    logs.info(`Bot uptime: ${process.uptime().toFixed(2)} seconds`);
}, 600000); // Log stats every 10 minutes

// Initialize the bot
(async () => {
    try {
        loadCommands(); // Load commands
        loadEvents();  // Load events
        await client.login(process.env.TOKEN); 
        logs.info('Bot connected successfully.');
    } catch (err) {
        logs.error(`Error starting the bot: ${err.message}`);
        process.exit(1);
    }
})();
