const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const request = require("request");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Gibt dir die Toplisten eines bestimmten Spielmodus')
        .addStringOption(option => option.setName('gamemode').setDescription('Wähle den Spielmodus von welchem du die Statistiken sehen möchtest').setRequired(true)),
    async execute(interaction, client) {
        const gamemode = interaction.options.getString('gamemode');

        const options = {
            'method': 'GET',
            'url': 'https://www.timolia.de/api/leaderboard/' + gamemode,
            'headers': {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept-Encoding': 'application/json',
                'Cookie': 'hl=de'
            }
        };
        
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            //const embed = new MessageEmbed()
            //    .setTitle(`Top 10 • ${gamemode}`)
            //    .setURL(`https://www.timolia.de/game/${gamemode}/leaderboard`)
            //    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
            //    .setTimestamp(interaction.createdAt)
            //    .setColor("#4680FC");
            //response.forEach(d => {
            //    embed.addFields(
            //        {
            //            name: `${d.rank} ${d.name}`, value: `Punkte: ${d.points}`
            //        }
            //    );
            //});
        });
    },
};