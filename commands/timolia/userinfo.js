const mc = require("mc-stats");
const mysql = require('mysql');
const Discord = require("discord.js");

module.exports = {
	name: 'userinfo',
	description: 'Gibt dir Informationen über einen Spieler',
    args: true,
    cooldown: 5,
    usage: '[Spieler]',
	execute(message, args, client) {
        var Spieler = (args[0]);
        var Spielerkopf = "https://mineskin.de/armor/body/" + Spieler + "/200.png"
        var url = "https://www.timolia.de/stats/" + Spieler

        // SQL Connection
        var con = mysql.createConnection({
            host: "91.204.46.56",
            user: "k132321_bot",
            password: "karmatopISTdie187gang",
            database: "k132321_karmatop"
        });

        const notfound = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} • Fehler`)
        .setDescription(`Es konnten keine Informationen für **${Spieler}** gefunden werden.`)
        .setTimestamp(message.createdAt)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor("#4680FC");

        con.connect(function(err) {
            con.query("SELECT COUNT(*) AS value FROM data WHERE player = '" + Spieler + "'", function (err, points) {
                if (points[0].value > 0) {
                    con.query("SELECT karma FROM data WHERE player = '"+ Spieler +"'", function (err, karmapunkte) {
                        mc.timolia(Spieler).then(result => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`${client.user.username} • Userinfo für ${result.name}`)
                                .setURL(`${url}`)
                                .setThumbnail(`${Spielerkopf}`)
                                .addFields(
                                    { name: `Name`, value: `${result.name}` },
                                    { name: `Rang`, value: `${result.rank}` },
                                    { name: `Beitritt`, value: `${result.firstLogin}` },
                                    { name: `Freunde`, value: `${result.friends}` },
                                    { name: `Erfolgspunkte`, value: `${karmapunkte[0].karma}` })
                                .setTimestamp(message.createdAt)
                                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                                .setColor("#4680FC");
                            if (!result.firstLogin) return message.channel.send(notfound)
                            return message.channel.send(embed);
                        });
                    });
                } else {
                    mc.timolia(Spieler).then(result => {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`${client.user.username} • Userinfo für ${result.name}`)
                            .setURL(`${url}`)
                            .setThumbnail(`${Spielerkopf}`)
                            .addFields(
                                { name: `Name`, value: `${result.name}` },
                                { name: `Rang`, value: `${result.rank}` },
                                { name: `Beitritt`, value: `${result.firstLogin}` },
                                { name: `Freunde`, value: `${result.friends}` },
                                { name: `Erfolgspunkte`, value: `Kein Karma gefunden` })
                            .setTimestamp(message.createdAt)
                            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                            .setColor("#4680FC");
                        if (!result.firstLogin) return message.channel.send(notfound)
                        return message.channel.send(embed);
                    });
                }
            });
        });
	},
};