module.exports = {
	name: 'kick',
	description: 'Markiere jemanden und kicke diesen(but not really).',
	guildOnly: true,
	usage: '[@User]',
	permissions: 'KICK_MEMBERS',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('Du hast keinen Nutzer markiert!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Du hast ${taggedUser.username} gekickt`);
	},
};