const Discord = require("discord.js");

module.exports = {
	name: 'invite',
	description: 'Gibt dir einen Einladungslink um den Bot auf deinem Server hinzuzufügen.',
	aliases: ['getbot'],
	execute(message, args, client) {
        var embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} • Invite`)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription('Mit dem folgendem [Link](https://bit.ly/3op4lMm) kannst du den Bot auf deinen Server einladen.')
        .setTimestamp(message.createdAt)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor("#4680FC");
        message.channel.send(embed);
	},
};