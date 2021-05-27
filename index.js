const { token, autoposter } = require('./config.json');
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: `${token}` });

//top.gg - autopost stats
const AutoPoster = require('topgg-autoposter')
const ap = AutoPoster(`${autoposter}`, manager)
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

manager.on('shardCreate', shard => console.log(`Shard ${shard.id} erfolgreich gestartet`));
manager.spawn();