const Discord = require("discord.js");

module.exports = {
	name: 'serverlist',
	description: 'Eine Liste aller Timolia Community Server',
	execute(message, client) {
        var embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} • Community Server`)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
          { name: 'Timolia Achievements', value: 'https://discord.gg/t9Jny6ds3E' },
          { name: 'Timolia Zeitung', value: 'https://discord.gg/ehC26pKWmZ' },
          { name: 'Splun Community', value: 'https://discord.gg/RGHcweAg2b' },
          { name: 'Castles Community', value: 'https://discord.gg/dkDe6EKjNr' },
          { name: '4rena Community', value: 'https://discord.gg/7SXq2EK8EP' },
          { name: 'InTime Community', value: 'https://discord.gg/4b2Gg8h9cv' },
          { name: 'SurvivalQuest Community', value: 'https://discord.gg/7EUxhJcuFh' }
        )
        .setTimestamp(message.createdAt)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor("#4680FC");
        message.channel.send(embed);
	},
};