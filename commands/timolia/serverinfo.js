const util = require('minecraft-server-util');
const Discord = require("discord.js");

module.exports = {
	name: 'serverinfo',
	description: 'Pingt Minecraft Server an und fragt den Status & aktuelle Spieler Zahl aus',
	args: true,
  usage: '[ServerIP]',
	execute(message, args, client) {
		const Server = args[0].toLowerCase();
	util.status(`${Server}`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
      .then((response) => {
          var embed = new Discord.MessageEmbed()
          .setTitle(`Timolia Statistiken • Serverinfo für ${Server}`)
          .addFields(
            { name: `IP-Adresse:`, value: `${response.host}`, inline: true },
            { name: `Port:`, value: `${response.port}`, inline: true },
            { name: `Aktuelle Spieler:`, value: `${response.onlinePlayers} / ${response.maxPlayers}`, inline: true })
          .setTimestamp(message.createdAt)
          .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
          .setColor("#20FF00");
          message.channel.send(embed);
      })
      .catch((error) => {
        var embed = new Discord.MessageEmbed()
          .setTitle("Timolia Statistiken • Status")
          .addFields(
            { name: `OFFLINE`, value: `Der Server ist zur Zeit nicht erreichbar.` })
          .setTimestamp(message.createdAt)
          .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
          .setColor("#FF0000");
          message.channel.send(embed);
          throw error;
      });
	},
};