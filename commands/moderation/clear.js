module.exports = {
	name: 'clear',
	description: 'Löscht bis zu 99 Nachrichten',
	guildOnly: true,
	usage: '[1-99]',
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Das Argument muss eine Nummer sein');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Du musst eine Nummer zwischen 1-99 angeben');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Es ist ein Fehler beim Löschen der Nachrichten aufgetreten');
		});
	},
};