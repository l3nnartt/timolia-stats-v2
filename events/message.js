const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'message',
	execute(message, client) {

		console.log("test")

		if (message.channel.type === 'dm') {
			
			//TimeStamp
			const timestamp = new Date();

			//Log Check
			if (message.author.id === "803579214553022484") {
				return;
			} else {
				//Discord Log
				const embed = new Discord.MessageEmbed()
					.setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
					.setDescription(`${message.content}`)
					.setTimestamp(message.createdAt)
					.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
					.setColor("#2a2a2a");
				client.channels.cache.get('828385793528561694').send({embeds: [embed]});

				//File Log
				fs.appendFile(`./debug.log`, `timestamp: ${timestamp};\t Author: ${message.author.tag};\t Content: ${message.content};\n`, function (err) {
					if (err) throw err;
				});
			}

			//Serverlist
			if (message.content === `botinfo`) {
				if (message.author.id === "398101340322136075") {
					const botinfo = new Discord.MessageEmbed()
						.setDescription(`Server: ${client.guilds.cache.size}`)
						.setTimestamp(message.createdAt)
						.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
						.setColor("#2a2a2a");

					client.guilds.cache.forEach((guild) => {
						botinfo.addFields(
							{
								name: guild.name,
								value: guild.memberCount,
								inline: true
							}
						);
					})
					message.channel.send(botinfo);
				} else {
					const fehler = new Discord.MessageEmbed()
						.setDescription("Das darfst du nicht! :)")
						.setTimestamp(message.createdAt)
						.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
						.setColor("red");
					client.channels.cache.get('828385793528561694').send({embeds: [fehler]});
				}
			}
		}
	},
};