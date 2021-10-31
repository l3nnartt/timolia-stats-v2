const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Sagt dir aktuelle Informationen zum Status von Timolia'),
    async execute(interaction, client) {
        util.status(`timolia.de`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
            .then((response) => {
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username} • Status`)
                    .setThumbnail(`https://i.imgur.com/NkFEsHW.png`)
                    .addFields(
                        { name: `IP-Adresse:`, value: `${response.host}`, inline: true },
                        { name: `Port:`, value: `${response.port}`, inline: true },
                        { name: `Aktuelle Spieler:`, value: `${response.onlinePlayers} / ${response.maxPlayers}`, inline: true },
                        { name: `Version:`, value: `${response.version}`})
                    .setTimestamp(interaction.createdAt)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor("#00FF00");
                interaction.reply({embeds: [embed]});
            })
            .catch((error) => {
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username} • Status`)
                    .addFields(
                        { name: `FEHLER/OFFLINE`, value: `Timolia ist zur Zeit nicht erreichbar!\nBitte versuche es in 5 Minuten erneut.` })
                    .setTimestamp(interaction.createdAt)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor("#FF0000");
                interaction.reply({embeds: [embed]});
                throw error;
            });
    },
};