const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require("request");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Gibt dir die Toplisten eines bestimmten Spielmodus')
        .addStringOption(option => option.setName('spielmodus').setDescription('Wähle den Spielmodus von welchem du die Statistiken sehen möchtest').setRequired(true)),
    async execute(interaction, client) {
        const gamemode = interaction.options.getString('spielmodus').toLowerCase();

        const options = {
            'method': 'GET',
            'url': 'https://www.timolia.de/api/leaderboard/' + gamemode,
            'headers': {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept-Encoding': 'application/json',
                'Cookie': 'hl=de'
            }
        };

        request(options, function (error, response) {
            if (error) throw new Error(error);
            const raw = JSON.parse(response.body);
            const embed = new EmbedBuilder()
                .setTitle(`Top 10 • ${gamemode}`)
                .setURL(`https://www.timolia.de/game/${gamemode}/leaderboard`)
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setTimestamp(interaction.createdAt)
                .setColor("#4680FC")

            if (raw.data === null) {
                const fail = new EmbedBuilder()
                    .setTitle(`Fehler`)
                    .setDescription(`Es konnte keine Topliste für ${gamemode} gefunden werden`)
                    .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp(interaction.createdAt)
                    .setColor("#ff0000")
                interaction.reply({embeds: [fail]});
            } else {
                for (let i = 0; i < 10; i++) {
                    const punkte = raw.data[i].sum_score || raw.data[i].points;
                    embed.addFields({name: `${raw.data[i].position}. ${raw.data[i].name}`, value: `${punkte} Punkte`})
                }
                interaction.reply({embeds: [embed]});
            }
        });
    },
};