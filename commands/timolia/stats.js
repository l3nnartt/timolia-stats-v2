const Discord = require("discord.js");
const DOMParser = require('dom-parser');
const fetch = require('node-fetch');

module.exports = {
	name: 'stats',
	description: 'Gibt dir die Statistiken von einem Spieler',
    args: true,
    cooldown: 5,
    usage: '[Spielmodus] [Spieler]',
	execute(message, args, client) {

        let gamemode = (args[0]).toLowerCase();
        let spieler = (args[1]);
        let spielerkopf = "https://cravatar.eu/helmavatar/" + spieler + "/60.png"
        const url = "https://timolia.de/stats/" + spieler;

        const fail = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription('Fehlendes Argument, korrekte Benutzung ``+stats [Spielmodus] [Spieler]``')
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        const errorembed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Statistiken für **${spieler}** in **${gamemode}** gefunden werden.`)
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        if(!gamemode) return message.channel.send(fail);
        if(!spieler) return message.channel.send(fail);

        if (gamemode === "pxlspace") {
            const url = `https://hosting151773.a2e37.netcup.net/lennart/timolia/addon/pxl-api-test.php?name=` + spieler;
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const pxl = new Discord.MessageEmbed()
                        .setTitle(`${gamemode} • ${spieler}`)
                        .setURL(`${url}`)
                        .setThumbnail(`${spielerkopf}`)
                        .setTimestamp(message.createdAt)
                        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                        .setColor("#4680FC");
                    for (var key of Object.keys(data)) {
                        var v = data[key];
                        if (key != "uuid" && key != "name") {
                            pxl.addFields({
                                name: key,
                                value: v,
                                inline: true,
                            });
                        }
                    }
                    message.channel.send(pxl);
                });
        } else {
            getStats(url, `${gamemode}`, data => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${gamemode} • ${spieler}`)
                    .setURL(`${url}`)
                    .setThumbnail(`${spielerkopf}`)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor("#4680FC");
                data.forEach(d => {
                    embed.addFields(
                        {
                            name: d.name,
                            value: d.value,
                            inline: true
                        }
                    );
                });

                if(data.length === 0) message.channel.send(errorembed);
                else return message.channel.send(embed);
            });
        }

        function getStats(url, statName, onData) {
            const data = [];
            fetch(url).then(function (response) {
                return response.text();
            }).then(function (html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const ul = doc.getElementsByClassName('col-lg-10');
                const lis = ul[0].getElementsByTagName('li');
                lis.forEach(li => {
                    const name = li.getElementsByClassName('stat-header')[0].innerHTML;
                    if (name.toLowerCase() === statName.toLowerCase()) {
                        const rows = li.getElementsByClassName('stats-table-field');
                        rows.forEach(row => {
                            const td = row.getElementsByTagName('td');
                            data.push({
                                name: td[0].innerHTML,
                                value: td[1].innerHTML
                            });
                        });
                    }
                });
                onData(data);
            }).catch(function (err) {
                console.warn('Fehler bei der Suche nach Statistiken:', err);
                message.channel.send(errorembed);
            });
        }
    }
};