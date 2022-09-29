const { Colors, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Latency and API response times'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} • Ping`)
            .setDescription(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            .setTimestamp(interaction.createdAt)
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setColor(Colors.Green);
        interaction.reply({embeds: [embed]});
    },
};