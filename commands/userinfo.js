const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mc = require("mc-stats");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gibt dir Informationen über einen Spieler')
        .addStringOption(option => option.setName('player').setDescription('Von welchem Spieler möchtest du Informationen sehen?').setRequired(true)),
    async execute(interaction, client) {
        const player = interaction.options.getString('player');
        const playerhead = "https://mineskin.de/armor/body/" + player + "/200.png";
        const url = "https://www.timolia.de/stats/" + player;

        const notfound = new MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Informationen für **${player}** gefunden werden.`)
            .setTimestamp(interaction.createdAt)
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setColor("#4680FC");

        mc.timolia(player).then(result => {
            if (!result.name) return interaction.reply({embeds: [notfound]});

            const userinfo = new MessageEmbed()
                .setTitle(`${client.user.username} • Userinfo für ${result.name}`)
                .setURL(`${url}`)
                .setThumbnail(`${playerhead}`)
                .addFields(
                    { name: `Name`, value: `${result.name}` },
                    { name: `Rang`, value: `${result.rank}` },
                    { name: `Beitritt`, value: `${result.firstLogin.toDateString()}` },
                    { name: `Freunde`, value: `${result.friends}` },
                    { name: `Karma`, value: `${result.karma}` })
                .setTimestamp(interaction.createdAt)
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setColor("#4680FC");
            interaction.reply({embeds: [userinfo]});
        });
    },
};