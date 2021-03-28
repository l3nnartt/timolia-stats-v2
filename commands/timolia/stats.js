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
        function getStats(url, statName, onData) {
            const data = new Array();
            fetch(url).then(function (response) {
                return response.text();
            }).then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var ul = doc.getElementsByClassName('col-lg-10');
                var lis = ul[0].getElementsByTagName('li');
                lis.forEach(li => {
                    var name = li.getElementsByClassName('stat-header')[0].innerHTML;
                    if (name.toLowerCase() === statName.toLowerCase()) {
                        var rows = li.getElementsByClassName('stats-table-field');
                        rows.forEach(row => {
                            var td = row.getElementsByTagName('td');
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
                var embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.username} • Fehler`)
                .setDescription('Es konnten keine Statistiken für diesen Spieler im ausgewählten Spielmodus gefunden werden.')
                .setTimestamp(message.createdAt)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setColor("#4680FC");
                message.channel.send(embed);
            });
        }
        let Gamemode = (args[0]).toLowerCase();
        let Spieler = (args[1]);
        let Spielerkopf = "https://cravatar.eu/helmavatar/" + Spieler + "/60.png"
        const url = "https://timolia.de/stats/" + Spieler;
        getStats(url, `${Gamemode}`, data => {
            const embed = new Discord.MessageEmbed()
                .setTitle(`${Gamemode} • ${Spieler}`)
                .setURL(`${url}`)
                .setThumbnail(`${Spielerkopf}`)
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
            })
            message.channel.send(embed)
        });
    }
};