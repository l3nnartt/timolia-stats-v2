const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'karmatop',
	cooldown: 5,
	description: 'karmatop',
	execute(message, args, client) {
		const url = `https://karmatop.de/addon/karmatop.php`;
		fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}})
		.then((res) => res.json())
		.then((data) => {
			const fields = [];
			data.forEach(function(item, index) {
				fields.push({
					name: `${index + 1}. ${item.player}`,
					value: item.karma + ` Erfolgspunkte`
				});
			});

			const embed = new Discord.MessageEmbed()
				.setTitle(`${client.user.username} • Karmatop`)
				.setURL("https://karmatop.de/karmatop.php")
				.setFooter(`${client.user.username}`, client.user.displayAvatarURL())
				.setTimestamp(message.createdAt)
				.setColor("#4680FC")
				.addFields(fields);
			message.channel.send(embed);
		});
    }
};