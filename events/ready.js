const util = require('minecraft-server-util');
const { EmbedBuilder } = require('discord.js');
const { logChannel } = require('../config.json');
const { ActivityType } = require("discord-api-types/v10");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        // Login-Konsole
        console.log(' ');
        console.log('┌──────────────────────────────────── Login ─────────────────────────────────────────┐');
        console.log(`│ > Eingeloggt als ${client.user.tag}!                                         │`);
        console.log('├──────────────────────────────────── Anzahl ────────────────────────────────────────┤');
        console.log(`│ > Aktiv auf ${client.guilds.cache.size} Servern!                                                            │`);
        console.log('│──────────────────────────────────── Server ────────────────────────────────────────│');
        let content = "";
        let s = "";
        client.guilds.cache.forEach((guild) => {
            let spaces = 85 - (`│ > ${guild.name} USER: ${guild.memberCount}`).length;
            s += 1;
            if (s > Number(client.guilds.cache.size) - 2) {
                content += `\n│`;

            } else {
                content += '│';
            }
            content += ` > ${guild.name} USER: ${guild.memberCount}`;

            for (i = 0; i < spaces; i++) {
                content += ' ';
            }
            content += '│';
        });
        console.log(content);
        console.log('└────────────────────────────────────────────────────────────────────────────────────┘    ');
        console.log(' ');

        //Rich Presence/RPC
        setInterval(() => {
            util.status('play.timolia.de')
                .then((response) => {
                    client.user.setActivity(`mit ${response.players.online} Personen`, { type: ActivityType.Playing });
                })
                .catch((error) => {
                    //console.log(error)
                    client.user.setActivity(`mit 0 Personen`, { type: ActivityType.Playing });
                });
        }, 15000);

        //Discord Message
        const embed = new EmbedBuilder()
            .setDescription(`Bot started!`)
            .setTimestamp()
            .setColor("#00FF00");
        client.channels.cache.get(logChannel).send({embeds: [embed]});
    },
};