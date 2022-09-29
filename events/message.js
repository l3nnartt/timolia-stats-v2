const { EmbedBuilder } = require('discord.js');
const { logChannel } = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (message.type === 'DEFAULT' && message.author.id !== client.user.id && message.guildId === null) {
            // Direct Message Discord Log
            const embed = new EmbedBuilder()
                .setAuthor({name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                .setDescription(`${message.content}`)
                .setTimestamp(message.createdAt)
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
            client.channels.cache.get(logChannel).send({embeds: [embed]});
        }
    },
};