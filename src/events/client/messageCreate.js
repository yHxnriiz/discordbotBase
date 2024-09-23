const cooldown = new Map();
require('dotenv').config();

// Load developer IDs from .env file
const developers = process.env.DEVELOPERS?.split(',') || []; // remove this part so everyone can use the bot

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Ignore bot messages
        if (message.author.bot || !message.guild) return;

        const { author, content } = message;
        const prefix = '!';

        // Ensure message starts with the prefix
        if (!content.startsWith(prefix)) return;

        const args = content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        // If command doesn't exist, return
        if (!command) return;

        // Restrict usage to developers only so everyone can use the bot just remove that part and the "const developers = process.env.DEVELOPERS?.split(',') || []" (it's at the top)
        if (!developers.includes(author.id)) {
            return message.reply("You don't have permission to use this bot.").catch(() => {});
        }

        // Cooldown control (3 seconds)
        const now = Date.now();
        const cooldownTime = 3000;
        if (cooldown.has(author.id) && now < cooldown.get(author.id)) {
            const timeLeft = ((cooldown.get(author.id) - now) / 1000).toFixed(1);
            return message.reply(`Please wait ${timeLeft} seconds before using this command again.`)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000))
                .catch(() => {});
        }

        cooldown.set(author.id, now + cooldownTime);
        setTimeout(() => cooldown.delete(author.id), cooldownTime);

        // Execute the command
        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`Error executing command: ${commandName}`, error);
            message.reply('There was an error executing this command.').catch(() => {});
        }
    }
};
