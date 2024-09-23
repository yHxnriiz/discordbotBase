module.exports = {
    name: 'avatar',
    aliases: ['av'],

    async execute(message, args, client) {
        // If there is a mention, get the avatar of the mentioned person. Otherwise, get the author's avatar.
        const user = message.mentions.users.first() || message.author;
        // Send the avatar URL directly as a reply
        await message.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }));
    }
};
