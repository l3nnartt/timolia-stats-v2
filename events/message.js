const {MessageEmbed} = require('discord.js');

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
            client.channels.cache.get('828385793528561694').send({embeds: [embed]});
        }
    },
};