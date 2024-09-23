module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Ignore messages sent by bots
        if (message.author.bot) return;

        // Check if the message mentions the bot specifically
        const mentionRegex = new RegExp(`^<@!?${client.user.id}>$`);
        if (mentionRegex.test(message.content.trim())) {
            try {
                await message.reply({
                    content: 'Hello! How can I assist you?',
                });
            } catch (err) {
                console.error(`Error responding to mention: ${err.message}`);
            }
        }
    }
};
