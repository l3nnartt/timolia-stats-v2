const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const DOMParser = require('dom-parser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Gibt dir die Statistiken von einem Spieler')
        .addStringOption(option => option.setName('player').setDescription('Wähle den Spieler von welchem du die Statistiken sehen möchtest').setRequired(true))
        .addStringOption(option => option.setName('gamemode').setDescription('Wähle den Spielmodus von welchem du die Statistiken sehen möchtest').setRequired(true)),
    async execute(interaction, client) {
        const spieler = interaction.options.getString('player');
        const gamemode = interaction.options.getString('gamemode');

        let spielerkopf = "https://cravatar.eu/helmavatar/" + spieler + "/60.png"
        const url = "https://timolia.de/stats/" + spieler;

        const fail = new MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription('Fehlendes Argument, korrekte Benutzung ``/stats [Spielmodus] [Spieler]``')
            .setTimestamp(interaction.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        const errorembed = new MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Statistiken für **${spieler}** in **${gamemode}** gefunden werden.`)
            .setTimestamp(interaction.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        if(!gamemode) return interaction.reply({embeds: [fail]});
        if(!spieler) return interaction.reply({embeds: [fail]});

        if (gamemode === "pxlspace") {
            const url = `https://karmatop.de/addon/pxl-api.php?name=` + spieler;
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const pxl = new MessageEmbed()
                        .setTitle(`${gamemode} • ${spieler}`)
                        .setURL(`${url}`)
                        .setThumbnail(`${spielerkopf}`)
                        .setTimestamp(interaction.createdAt)
                        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                        .setColor("#4680FC");
                    for (var key of Object.keys(data)) {
                        var v = data[key];
                        if (key !== "uuid" && key !== "name") {
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
                const embed = new MessageEmbed()
                    .setTitle(`${gamemode} • ${spieler}`)
                    .setURL(`${url}`)
                    .setThumbnail(`${spielerkopf}`)
                    .setTimestamp(interaction.createdAt)
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

                if(data.length === 0) interaction.reply({embeds: [errorembed]});
                else return interaction.reply({embeds: [embed]});
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
                //console.warn('Fehler bei der Suche nach Statistiken:', err);
                interaction.reply({embeds: [errorembed]});
            });
        }
    },
};