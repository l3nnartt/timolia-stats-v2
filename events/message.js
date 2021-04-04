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
				.setTitle(`${message.author.tag}`)
				.addFields({ name: `Content:`, value: `${message.content}`})
				.setFooter(`${timestamp}`)
			client.channels.fetch('828385793528561694').then(channel => channel.send(embed));
		}
	},
};