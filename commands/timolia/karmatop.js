const Discord = require("discord.js");
const mysql = require('mysql');

module.exports = {
	name: 'karmatop',
	cooldown: 5,
	description: 'karmatop',
	execute(message, args, client) {
		// SQL Connection
		var con = mysql.createConnection({
		host: "91.204.46.56",
		user: "k132321_bot",
		password: "karmatopISTdie187gang",
		database: "k132321_karmatop"
		});

		con.connect(function(err) {
            con.query("SELECT * FROM data ORDER BY karma+0 DESC LIMIT 10", function (err, result) {
                const fields = new Array();
                result.forEach(function(item, index) {
					fields.push({
					  name: `${index + 1}. ${item.player}`,
					  value: item.karma
					});
				  });
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} • Karmatop`)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                    .setTimestamp(message.createdAt)
                    .setColor("#4680FC")
                    .addFields(fields );
                message.channel.send(embed)
            });
        });
    }
};