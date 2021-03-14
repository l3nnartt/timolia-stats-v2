const mc = require("mc-stats");
const Discord = require("discord.js");

module.exports = {
	name: 'userinfo',
	description: 'Gibt dir Informationen über einen Spieler',
    args: true,
    usage: '[Spieler]',
	execute(message, args, client) {
        var Spieler = (args[0]);
        var Spielerkopf = "https://cravatar.eu/helmhead/" + Spieler + "/140.png"
        mc.timolia(Spieler).then(result => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Timolia Statistiken • Userinfo für ${result.name}`)
            .setThumbnail(`${Spielerkopf}`)
            .addFields(
                { name: `Name`, value: `${result.name}` },
                { name: `Rang`, value: `${result.rank}` },
                { name: `Beitritt`, value: `${result.firstLogin}` },
                { name: `Freunde`, value: `${result.friends}` })
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
        const notfound = new Discord.MessageEmbed()
            .setTitle("Timolia Statistiken • Fehler")
            .setDescription(`Es konnten keine Statistiken für **${Spieler}** gefunden werden.`)
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
        if (!result.firstLogin) return message.channel.send(notfound)
        if (result) return message.channel.send(embed);
    })
	},
};