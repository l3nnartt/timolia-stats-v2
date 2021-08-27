const mc = require("mc-stats");
const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'userinfo',
	description: 'Gibt dir Informationen über einen Spieler',
    args: true,
    aliases: ['karma'],
    cooldown: 5,
    usage: '[Spieler]',
	execute(message, args, client) {
        var Spieler = (args[0]);
        var Spielerkopf = "https://mineskin.de/armor/body/" + Spieler + "/200.png";
        var url = "https://www.timolia.de/stats/" + Spieler;
        var api = "https://karmatop.de/addon/karma.php?name=" + Spieler;

        const notfound = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Informationen für **${Spieler}** gefunden werden.`)
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        fetch(api, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }})
            .then((res) => res.json())
            .then((data) => {
                mc.timolia(Spieler).then(result => {
                    const karmatop = new Discord.MessageEmbed()
                        .setTitle(`${client.user.username} • Userinfo für ${result.name}`)
                        .setURL(`${url}`)
                        .setThumbnail(`${Spielerkopf}`)
                        .addFields(
                            { name: `Name`, value: `${result.name}` },
                            { name: `Rang`, value: `${result.rank}` },
                            { name: `Beitritt`, value: `${result.firstLogin.toDateString()}` },
                            { name: `Freunde`, value: `${result.friends}` })
                        .setTimestamp(message.createdAt)
                        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                        .setColor("#4680FC");
                    
                    if (!result.firstLogin) return message.channel.send(notfound);

                    if (data.length === 0) {
                        karmatop.addFields({ name: `Erfolgspunkte`, value: `Kein Karma gefunden`});
                        message.channel.send(karmatop);
                    } else {
                        karmatop.addFields({ name: `Erfolgspunkte`, value: `${data[0].karma}`});
                        message.channel.send(karmatop);
                    }
                });
            });
    },
};