module.exports = {
	name: 'serverinfo',
	description: 'Informationen zum Discordserver',
	guildOnly: true,
	execute(message) {
		message.channel.send(`Server-Name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
	},
};