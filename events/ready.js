const util = require('minecraft-server-util');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// ❯ Login Konsole
		console.log(' ')
		console.log('┌──────────────────────────────────── Login ─────────────────────────────────────────┐')
		console.log(`│ > Eingeloggt als ${client.user.tag}!                                         │`);
		console.log('├──────────────────────────────────── Anzahl ────────────────────────────────────────┤')
		console.log(`│ > Aktiv auf ${client.guilds.cache.size} Servern!                                                            │`)
		console.log('│──────────────────────────────────── Server ────────────────────────────────────────│')
		let content = "";
		let s = "";
		  client.guilds.cache.forEach((guild) => {
		  let spaces = 85 - (`│ > ${guild.name} member's ${guild.memberCount}`).length
		  s += 1
		  if(s > Number(client.guilds.cache.size)-2){
			content += `\n│`
	  
		  } else {
			content += '│'
		  }
		  content += ` > ${guild.name} member's ${guild.memberCount}`
	  
		  for (i = 0; i < spaces; i++) { 
			content += ' '
		  }
				content += '│'
		})
		console.log(content)
		console.log('└────────────────────────────────────────────────────────────────────────────────────┘    ')
		console.log(' ')

		// ❯ Rich Presence/RPC
		setInterval(() => {
			util.status(`timolia.de`, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 })
	  			.then((response) => {
			const activities = [
				`mit ${response.onlinePlayers} Spielern | +help`
			];
			let activity = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(
				activity,
					{
		  				type: "PLAYING"
					}
				);
			});
  		},15000);
	},
};