const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mc = require("mc-stats");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Gibt dir Informationen über einen Spieler')
        .addStringOption(option => option.setName('spieler').setDescription('Von welchem Spieler möchtest du Informationen sehen?').setRequired(true)),
    async execute(interaction, client) {
        const spieler = interaction.options.getString('spieler');
        const Spielerkopf = "https://mineskin.de/armor/body/" + spieler + "/200.png";
        const url = "https://www.timolia.de/stats/" + spieler;

        const notfound = new MessageEmbed()
            .setTitle(`${client.user.username} • Fehler`)
            .setDescription(`Es konnten keine Informationen für **${spieler}** gefunden werden.`)
            .setTimestamp(interaction.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");

        mc.timolia(spieler).then(result => {
            if (!result.name) return interaction.reply({embeds: [notfound]});

            const userinfo = new MessageEmbed()
                .setTitle(`${client.user.username} • Userinfo für ${result.name}`)
                .setURL(`${url}`)
                .setThumbnail(`${Spielerkopf}`)
                .addFields(
                    { name: `Name`, value: `${result.name}` },
                    { name: `Rang`, value: `${result.rank}` },
                    { name: `Beitritt`, value: `${result.firstLogin.toDateString()}` },
                    { name: `Freunde`, value: `${result.friends}` })
                .setTimestamp(interaction.createdAt)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setColor("#4680FC");
            interaction.reply({embeds: [userinfo]});
        });
    },
};