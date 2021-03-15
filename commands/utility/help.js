const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Listet alle existierenden Befehle auf',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Hier ist eine Liste mit allen Befehlen:\n');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nDu kannst \`${prefix}help [command]\` benutzen um genaures zu Erfahren!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Du hast eine DM mit allen Befehlen bekommen!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('Ich kann dir keine Direktnachricht aufgrund deiner Privatsphäre Einstellungen schicken!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Das ist kein existierender Befehl!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Beschreibung:** ${command.description}`);
		if (command.usage) data.push(`**Benutzung:** \`${prefix}${command.name} ${command.usage}\``);

		data.push(`**Cooldown:** ${command.cooldown || 3} Sekunde(n)`);

		message.channel.send(data, { split: true });
	},
};