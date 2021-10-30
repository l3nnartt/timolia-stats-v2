const { prefix } = require('../../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'help',
	description: 'Listet alle existierenden Befehle auf',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args, client) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const description = data.push(commands.map(command => command.name).join('\n'));
			const helpEmbed = new Discord.MessageEmbed()
				.setTitle('Hier ist eine Liste mit allen Befehlen:')
				.setDescription(data)
				.setTimestamp(message.createdAt)
				.addField(`Für weitere Informationen benutze`, `\`\`\`${prefix}help [command]\`\`\``, true)
				.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
				.setColor("#4680FC");
			return message.author.send(helpEmbed)
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('Du hast eine DM mit allen Befehlen bekommen!').then(m => m.delete({timeout: 5000}));
				message.delete();
			})
			.catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply('Ich kann dir keine Direktnachricht aufgrund deiner Privatsphäre Einstellungen schicken!');
			});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Dieser Befehl existiert nicht');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Beschreibung:** ${command.description}`);
		if (command.usage) data.push(`**Benutzung:** \`${prefix}${command.name} ${command.usage}\``);

		data.push(`**Cooldown:** ${command.cooldown || 3} Sekunde(n)`);

		const embed = new Discord.MessageEmbed()
			.setTitle(`Hilfe für ${command.name}`)
			.setDescription(data)
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setColor("#4680FC");
		message.channel.send(embed);
	},
};