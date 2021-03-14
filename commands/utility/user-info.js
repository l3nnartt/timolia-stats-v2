module.exports = {
	name: 'member',
	description: 'Informationen zu dir selber.',
	aliases: ['memberinfo'],
	execute(message) {
		message.channel.send(`Username: ${message.author.username}\nDev-ID: ${message.author.id}`);
	},
};