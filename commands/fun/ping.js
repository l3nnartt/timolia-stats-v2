const Discord = require("discord.js");

module.exports = {
	name: 'ping',
	description: 'Ping',
	cooldown: 5,
	execute(message, client) {
		console.log(client.user.username)

		const embed1 = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • Ping`)
			.setDescription(`Pinging...!`)
			.setTimestamp(message.createdAt)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
			.setColor("#4680FC");
		message.channel.send(embed1).then(sent => {
		const embed2 = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} • Ping`)
			.setDescription(`Dauer der Antwort: ${sent.createdTimestamp - message.createdTimestamp}ms`)
			.setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
			sent.edit(embed2);
		});
	},
};