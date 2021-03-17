const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'Nzg4NDUwNzc0NjQ4NzUwMDkw.X9jsAQ.nyico7gV4EYpEJSSWt8QK2-6_ZI' });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();