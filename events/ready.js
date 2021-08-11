const util = require('minecraft-server-util');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		//client.on(ready) Login-Konsole
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
		  if(s > Number(client.guilds.cache.size)-2){
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
			util.status(`timolia.de`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
	  			.then((response) => {
			const activities = [
				`mit ${response.onlinePlayers} Spielern | +help`
			];
			let activity = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(activity,
					{
		  				type: "PLAYING"
					}
				);
			}).catch(function (err) {
				const activities = [
					`mit 0 Spielern | +help`
				];
				let activity = activities[Math.floor(Math.random() * activities.length)];
				client.user.setActivity( activity,
						{
							  type: "PLAYING"
						}
					);
				});
  		},15000);

		//Discord Message
		var embed = new Discord.MessageEmbed()
			.setDescription(`Bot erfolgreich gestartet`)
			.setTimestamp(message.createdAt)
			.setColor("#2a2a2a");
	  	client.channels.fetch('828385793528561694').then(channel => channel.send(embed));
	},
};