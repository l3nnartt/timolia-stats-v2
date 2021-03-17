const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'Nzg4NDUwNzc0NjQ4NzUwMDkw.X9jsAQ.nyico7gV4EYpEJSSWt8QK2-6_ZI' });

//Top.gg
const AutoPoster = require('topgg-autoposter')
const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMzU3OTIxNDU1MzAyMjQ4NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE1OTg5MDY2fQ.QG3g9u5WAXBwoA1xUNRb6Sa59FT9sjFoEmU3dm9ezAU', manager)
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})

manager.on('shardCreate', shard => console.log(`Shard ${shard.id} erfolgreich gestartet`));
manager.spawn();