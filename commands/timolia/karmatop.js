const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
	name: 'karmatop',
	description: 'karmatop',
	execute(message, args, client) {
        const url = `https://karmatop.de/api.php`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                const result = new Array();
                for(let i in data.data.segments[0].stats) {
                   const selectedStat = data.data.segments[0].stats[i];
                   result.push({
                    name: selectedStat.displayName,
                    value: selectedStat.displayValue,
                    inline: true
                  });
                }
                console.log(result)

                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.username} • Karmatop`, client.user.displayAvatarURL(), `${url}`)
                    .setTimestamp(message.createdAt)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor("#4680FC")
                    .addFields(result);
                message.channel.send(embed);
            })
            .catch(e=> console.log('error fetching api: ', e));
    }
};