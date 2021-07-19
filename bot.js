const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const cooldowns = new Discord.Collection();

client.on('message', message => {
	if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send(`Mein Prefix ist \`\`${prefix}\`\``);
    };

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		const reply = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • Fehler`)
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setDescription(`Dieser Befehl funktioniert nur auf Servern!`)
			.setColor("#4680FC");
		return message.channel.send(reply);
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			const reply = new Discord.MessageEmbed()
				.setTitle(`${client.user.username} • Fehler`)
				.setTimestamp(message.createdAt)
				.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
				.setDescription(`Du hast nicht die nötigen Rechte für diesen Befehl!`)
				.setColor("#4680FC");
			return message.channel.send(reply);
		}
	}

	if (command.args && !args.length) {
		const reply = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • Fehler`)
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setDescription(`Fehlendes Argument, korrekte Benutzung \`${prefix}${command.name} ${command.usage}\``)
			.setColor("#4680FC");
		return message.channel.send(reply);
	}
	
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const reply = new Discord.MessageEmbed()
				.setTitle(`${client.user.username} • Fehler`)
				.setTimestamp(message.createdAt)
				.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
				.setDescription(`Bitte warte ${timeLeft.toFixed(1)} Sekunden bevor du \`${command.name}\` wieder benutzt.`)
				.setColor("#4680FC");
			return message.channel.send(reply);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		const reply = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • Fehler`)
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setDescription(`Es ist ein Fehler aufgetreten. Bitte wende dich an <@398101340322136075>!`)
			.setColor("#4680FC");
		return message.channel.send(reply);
	}
});

client.login(token);