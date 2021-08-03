const { token, autoposter } = require('./config.json');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: `${token}` });

//AutoPoster - TopGG Stats
const AutoPoster = require('topgg-autoposter');
//const ap = AutoPoster(`${autoposter}`, manager);

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

manager.on('shardCreate', shard => console.log(`Shard ${shard.id} erfolgreich gestartet`));
manager.spawn();