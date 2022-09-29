const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} • Invite`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Click [here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands) to add the bot to your server.`)
            .setTimestamp(interaction.createdAt)
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor("#4680FC");
        interaction.reply({embeds: [embed]});
    },
};