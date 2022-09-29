const { EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Gibt dir aktuelle Informationen zu dem Status des Timolia Netzwerkes'),
    async execute(interaction, client) {
        util.status('timolia.de')
            .then((response) => {
                const embed = new EmbedBuilder()
                    .setTitle(`${client.user.username} • Status`)
                    .setThumbnail(`https://i.imgur.com/NkFEsHW.png`)
                    .addFields(
                        {name: `IP-Adresse:`, value: `timolia.de`, inline: true},
                        {name: `Port:`, value: `25565`, inline: true},
                        {
                            name: `Aktuelle Spieler:`,
                            value: `${response.players.online} / ${response.players.max}`,
                            inline: true
                        },
                        {name: `Version:`, value: `${response.version.name}`})
                    .setTimestamp(interaction.createdAt)
                    .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setColor("#00FF00");
                interaction.reply({embeds: [embed]});
            })
            .catch((error) => {
                const embed = new EmbedBuilder()
                    .setTitle(`${client.user.username} • Status`)
                    .setDescription(`FEHLER/OFFLINE \n\n Timolia ist zur Zeit nicht erreichbar!\nBitte versuche es in 5 Minuten erneut.`)
                    .setTimestamp(interaction.createdAt)
                    .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                    .setColor("#FF0000");
                interaction.reply({embeds: [embed]});
                throw error;
            });
    },
};