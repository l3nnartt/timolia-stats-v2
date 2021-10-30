const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const request = require("request");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('beschreibung'),
    async execute(interaction, client) {
        var options = {
            'method': 'GET',
            'url': 'http://www.timolia.de/api/leaderboard/4rena',
            'headers': {
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': 'hl=de'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            const pxl = new MessageEmbed();
            response.forEach(function (item, index){
                console.log(data[0].name)
            })
            response.forEach(function(item, index) {
                pxl.addFields({
                    name: `${index + 1}. ${item.name}`,
                    value: item.position + ` Rang`
                });
            });
        });
    },
};