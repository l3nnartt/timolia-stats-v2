module.exports = {
	name: 'ping',
	description: 'Ping',
	cooldown: 5,
	execute(message) {
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Dauer der Antwort: ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	},
};