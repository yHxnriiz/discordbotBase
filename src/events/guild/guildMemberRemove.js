module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        client.logs.warn(`A member left: ${member.user.tag} (ID: ${member.id}) from server: ${member.guild.name}`);
    }
};
