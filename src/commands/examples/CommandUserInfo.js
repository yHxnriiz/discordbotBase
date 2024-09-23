const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],

    async execute(message, args, client) {
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.members.cache.get(user.id);

        const userInfoEmbed = new EmbedBuilder()
            .setColor('#9b59b6') // Cor roxa
            .setTitle('Infos User') // Título da embed
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Tag do Discord:', value: `${user.tag}`, inline: true },
                { name: 'ID do Discord:', value: `${user.id}`, inline: true },
                { name: 'Conta criada há:', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false },
                { name: 'Entrou no Servidor há:', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false }
            )
            .setImage('https://example.com/user-image.png') // Altere para a URL real da imagem
            .setFooter({ text: 'Informações de Usuário', iconURL: 'https://example.com/footer-icon.png' }) // Altere para a URL real do ícone
            .setTimestamp();

        await message.reply({ embeds: [userInfoEmbed] });
    }
};
