const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'exampleEmbed',
    aliases: ['embedEx'],

    async execute(message, args, client) {
        // Creates a custom embed
        const exampleEmbed = new EmbedBuilder()
            .setColor('#FF5733') // Sets the color of the embed (hex color)
            .setTitle('This is a Title') // Sets the title of the embed
            .setDescription('This is a description in the embed') // Adds a description
            .addFields(
                { name: 'Field 1', value: 'Some value for field 1', inline: true }, // Inline field
                { name: 'Field 2', value: 'Another value for field 2', inline: true }, // Another inline field
                { name: 'Field 3', value: 'This field is not inline', inline: false } // Regular field
            )
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }) // Footer with icon
            .setTimestamp(); // Adds the current timestamp
        
        // Sends the embed
        await message.reply({ embeds: [exampleEmbed] });
    }
};
