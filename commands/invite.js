const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Lädt den Bot auf deinen Server ein'),
    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} • Invite`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Mit dem folgendem [Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands) kannst du den Bot auf deinen Server einladen.`)
            .setTimestamp(interaction.createdAt)
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor("#4680FC");
        interaction.reply({embeds: [embed]});
    },
};