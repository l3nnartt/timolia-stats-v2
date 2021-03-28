const Discord = require("discord.js");
const mc = require("mc-stats");

module.exports = {
	name: 'winprobably',
	description: 'Rechnet dir die Gewinnwahrscheinlichkeit eines Spielers aus',
	cooldown: 5,
  args: true,
  usage: '[Gamemode] [Spieler]',
	execute(message, args, client) {
    var Gamemode = (args[0]);
    var Spieler = (args[1]);
    let Spielerkopf = "https://cravatar.eu/helmavatar/" + Spieler + "/60.png"
    mc.timolia(Spieler)
    .then(result => {
      const fixedGameMode = Gamemode === '1vs1' ? 'duels' : Gamemode;
      const playedgames = result.games[fixedGameMode].games_played;
      const gamesWon = result.games[fixedGameMode].games_won;
      const winProbability = (gamesWon / playedgames * 100).toFixed(2);
      var embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} • Gewinnwahrscheinlichkeit`)
        .setThumbnail(`${Spielerkopf}`)
        .setDescription(`Der Spieler **${Spieler}** hat in **${Gamemode}** eine Gewinnwahrscheinlichkeit von **${winProbability}%**`)
        .setTimestamp(message.createdAt)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        .setColor("#4680FC");
      message.channel.send(embed);
    })
	}
};