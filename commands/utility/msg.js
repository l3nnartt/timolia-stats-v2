const Discord = require("discord.js");

module.exports = {
	name: 'msg',
  args: true,
  usage: '[USERID] [NACHRICHT]',
	description: 'PRIVATE COMMAND',
	execute(message, args, client) {
    const fehler = new Discord.MessageEmbed()
      .setDescription("Das darfst du nicht! :)")
      .setTimestamp(message.createdAt)
      .setFooter(`${client.user.username}`)
      .setColor("red");
    const user = (args[0]);
    if(!user) return message.channel.send(fehler);
    if (message.author.id == '398101340322136075') {
      const nachricht = args.slice(1).join(' ');
      client.users.cache.get(user).send(nachricht);
    } else {
			message.channel.send(fehler);
    }
	},
};