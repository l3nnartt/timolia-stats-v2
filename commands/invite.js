const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Lädt den Bot auf deinen Server ein'),
    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} • Invite`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Mit dem folgendem [Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) kannst du den Bot auf deinen Server einladen.`)
            .setTimestamp(interaction.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
        interaction.reply({embeds: [embed]});
    },
};