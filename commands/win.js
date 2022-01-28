const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mc = require("mc-stats");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('win')
        .setDescription('Errechnet die Gewinnwahrscheinlichkeit in einem Modus von einem Spieler')
        .addStringOption(option => option.setName('player').setDescription('Wähle einen Spieler von welchem du die  Gewinnwahrscheinlichkeit sehen möchtest').setRequired(true))
        .addStringOption(option => option.setName('spielmodus').setDescription('Wähle den Spielmodus von welchem du die  Gewinnwahrscheinlichkeit sehen möchtest').setRequired(true)),
    async execute(interaction, client) {
        const player = interaction.options.getString('player');
        const Gamemode = interaction.options.getString('spielmodus').toLowerCase();
        const fixedGameMode = Gamemode === '1vs1' ? 'duels' : Gamemode;
        let playerhead = "https://cravatar.eu/helmavatar/" + player + "/60.png";

        mc.timolia(player)
        .then(result => {
            if (result.games === undefined || result.games[fixedGameMode] === undefined || result.errors === "User not found") {
                const embed = new MessageEmbed()
                    .setDescription(`Es konnte keine Gewinnwahrscheinlichkeit von **${player}** in **${Gamemode}** berechnet werden.`)
                    .setTimestamp(interaction.createdAt)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setColor("#ff0000");
                interaction.reply({embeds: [embed]});
            } else {
                const playedgames = result.games[fixedGameMode].games_played;
                const gamesWon = result.games[fixedGameMode].games_won;
                const winProbability = (gamesWon / playedgames * 100).toFixed(2);
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username} • Gewinnwahrscheinlichkeit`)
                    .setThumbnail(`${playerhead}`)
                    .setDescription(`Der Spieler **${player}** hat in **${Gamemode}** eine Gewinnwahrscheinlichkeit von **${winProbability}%**`)
                    .setTimestamp(interaction.createdAt)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setColor("#4680FC");
                interaction.reply({embeds: [embed]});
            }
        })
    },
};