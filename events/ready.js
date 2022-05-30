const util = require('minecraft-server-util');
const {MessageEmbed} = require('discord.js');
const {logChannel} = require('../config.json');

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
            util.status('timolia.de')
                .then((response) => {
                    const activities = [
                        `mit ${response.players.online} Spielern`
                    ];
                    let activity = activities[Math.floor(Math.random() * activities.length)];
                    client.user.setActivity(activity,
                        {
                            type: "PLAYING"
                        }
                    );
                })
                .catch((error) => {
                    //console.log(error)
                    const activities = [
                        `mit 0 Spielern`
                    ];
                    let activity = activities[Math.floor(Math.random() * activities.length)];
                    client.user.setActivity(activity,
                        {
                            type: "PLAYING"
                        }
                    );
                });
        }, 15000);

        //Discord Message
        const embed = new MessageEmbed()
            .setDescription(`Bot erfolgreich gestartet`)
            .setTimestamp()
            .setColor("#00FF00");
        client.channels.cache.get(logChannel).send({embeds: [embed]});
    },
};