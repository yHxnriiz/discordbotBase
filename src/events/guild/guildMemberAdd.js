module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        client.logs.info(`A new member joined: ${member.user.tag} (ID: ${member.id}) in server: ${member.guild.name}`);
    }
};
