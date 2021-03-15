module.exports = {
	name: 'avatar',
	description: 'Gibt dir den Avatar von dir selbst oder einem bestimmten Benutzer.',
	aliases: ['icon', 'pb'],
	usage: '[@User]',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Dein Avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s Avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};