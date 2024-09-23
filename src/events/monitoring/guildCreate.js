module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        client.logs.info(`Bot has been added to the server: ${guild.name} (ID: ${guild.id}). Member count: ${guild.memberCount}`);
    }
};
