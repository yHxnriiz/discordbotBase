module.exports = {
    name: 'guildDelete',
    async execute(guild, client) {
        client.logs.warn(`Bot has been removed from the server: ${guild.name} (ID: ${guild.id}).`);
    }
};
