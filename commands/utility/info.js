const Discord = require("discord.js");

module.exports = {
	name: 'info',
	description: 'Informationen über den Bot',
	aliases: ['information'],
	execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} • Botinfo`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Server', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Channel', value: `${client.channels.cache.size}`, inline: true },
                { name: 'Benutzer', value: `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, inline: true },
                { name: 'Version', value: `2.1`, inline: true},
                { name: 'Botinhaber', value: `<@398101340322136075>`, inline: true},
                { name: 'Datenbeschaffung', value: 'Die gesamten Daten stammen von der offiziellen [Timolia Website](https://timolia.de/stats). Trotzdem besteht keine Garantie auf Aktualität und Richtigkeit der Daten!' },
                { name: 'Karma Top 10', value: 'Die Karmatoplist wird manuell aktualisiert, den aktuellen Stand der Liste findet ihr unter der Toplist.' },
                { name: 'Hilfe & Fragen', value: 'Solltest du bei etwas Hilfe benötigen, oder eine Frage haben kannst du dich jederzeit bei [Mr_Milchmann_LP#0001](https://discord.com/users/398101340322136075) melden. \nAußerdem gibt es einen [Support Server](https://discord.gg/3HMw6UvWbq), auf welchem du dich melden kannst solltest du Hilfe benötigen oder eine Frage haben.' })
            .setTimestamp(message.createdAt)
            .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            .setColor("#4680FC");
        message.channel.send(embed);
	},
};