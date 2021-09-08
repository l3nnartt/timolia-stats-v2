const Discord = require("discord.js");

module.exports = {
	name: 'server',
  cooldown: 5,
  aliases: ['communityserver', 'servers'],
	description: 'Eine Liste aller Timolia Community Server',
	execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} • Community Server`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription
            (`[Timolia Achievements](https://discord.gg/t9Jny6ds3E)\n [JumpWorld Community](https://discord.gg/Y6DGketZYV)\n [Timolia Zeitung](https://discord.gg/Hf98ysqDCD)\n [Timolia Fails](https://discord.gg/cMJcCybQwR)\n [4rena Community](https://discord.gg/7SXq2EK8EP)\n [Splun Community](https://discord.gg/RGHcweAg2b)\n [Castles Community](https://discord.gg/dkDe6EKjNr)\n [SurvivalQuest Community](https://discord.gg/7EUxhJcuFh)\n [Arcade Community](https://discord.gg/pcky7gvQsP)\n [InTime Community](https://discord.gg/4b2Gg8h9cv)`)
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
        message.channel.send(embed);
	},
};