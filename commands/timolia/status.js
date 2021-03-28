const util = require('minecraft-server-util');
const Discord = require("discord.js");

module.exports = {
	name: 'status',
  cooldown: 5,
	description: 'Sagt dir aktuelle Informationen zum Status von Timolia',
	execute(message, args, client) {
	util.status(`timolia.de`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
      .then((response) => {
          var embed = new Discord.MessageEmbed()
          .setTitle(`${client.user.username} • Status`)
          .setThumbnail(`https://i.imgur.com/NkFEsHW.png`)
          .addFields(
            { name: `IP-Adresse:`, value: `${response.host}`, inline: true },
            { name: `Port:`, value: `${response.port}`, inline: true },
            { name: `Aktuelle Spieler:`, value: `${response.onlinePlayers} / ${response.maxPlayers}`, inline: true },
            { name: `Version:`, value: `${response.version}`})
          .setTimestamp(message.createdAt)
          .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
          .setColor("#00FF00");
          message.channel.send(embed);
      })
      .catch((error) => {
        var embed = new Discord.MessageEmbed()
          .setTitle(`${client.user.username} • Status`)
          .addFields(
            { name: `FEHLER/OFFLINE`, value: `Timolia ist zur Zeit nicht erreichbar!\nBitte versuche es in 5 Minuten erneut.` })
          .setTimestamp(message.createdAt)
          .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
          .setColor("#FF0000");
          message.channel.send(embed);
          throw error;
      });
	},
};