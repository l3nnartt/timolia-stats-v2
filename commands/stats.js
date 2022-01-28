const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const DOMParser = require('dom-parser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Gibt dir die Statistiken von einem Spieler')
        .addStringOption(option => option.setName('spieler').setDescription('Wähle den Spieler von welchem du die Statistiken sehen möchtest').setRequired(true))
        .addStringOption(option => option.setName('spielmodus').setDescription('Wähle den Spielmodus von welchem du die Statistiken sehen möchtest').setRequired(true)),
    async execute(interaction, client) {
        const spieler = interaction.options.getString('spieler');
        const gamemode = interaction.options.getString('spielmodus');

        let spielerkopf = "https://cravatar.eu/helmavatar/" + spieler + "/60.png"
        const url = "https://timolia.de/stats/" + spieler;

        const errorembed = new MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Statistiken für **${spieler}** in **${gamemode}** gefunden werden.`)
            .setTimestamp(interaction.createdAt)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("#4680FC");

        getStats(url, `${gamemode}`, data => {
            const embed = new MessageEmbed()
                .setTitle(`${gamemode} • ${spieler}`)
                .setURL(`${url}`)
                .setThumbnail(`${spielerkopf}`)
                .setTimestamp(interaction.createdAt)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
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
                console.log(err)
                interaction.reply({embeds: [errorembed]});
            });
        }
    },
};