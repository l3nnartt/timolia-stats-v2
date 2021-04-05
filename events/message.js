const fs = require('fs');
const Discord = require("discord.js");

module.exports = {
	name: 'message',
	execute(message, client) {
		if (message.channel.type == 'dm') {
			//TimeStamp
			const timestamp = new Date()

			//File Log
			fs.appendFile(`./debug.log`, `timestamp: ${timestamp};\t Author: ${message.author.tag};\t Content: ${message.content};\n`, function (err) {
				if (err) throw err;
			});

			//Discord Log
			var embed = new Discord.MessageEmbed()
				.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
				.setDescription(`${message.content}`)
				.setTimestamp(message.createdAt)
				.setFooter(`${client.user.username} Log-System`)
        		.setColor("#2a2a2a");
			client.channels.fetch('828385793528561694').then(channel => channel.send(embed));
		}
	},
};