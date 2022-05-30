const {MessageEmbed} = require('discord.js');
const {logChannel} = require('../config.json');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (message.type === 'DEFAULT' && message.author.id !== client.user.id && message.guildId === null) {
            // Direct Message Discord Log
            const embed = new MessageEmbed()
                .setAuthor({name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                .setDescription(`${message.content}`)
                .setTimestamp(message.createdAt)
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setColor("#2a2a2a");
            client.channels.cache.get(logChannel).send({embeds: [embed]});
        }
    },
};