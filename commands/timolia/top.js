const Discord = require("discord.js");
const DOMParser = require('dom-parser');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

module.exports = {
	name: 'top',
	description: 'Gibt dir die Toplisten eines bestimmten Spielmodus',
    args: true,
    usage: '[Spielmodus]',
	execute(message, args, client) {
        function fetchLeaderboards(statName, limit, onData) {
            const url = `https://www.timolia.de/game/${statName.toLowerCase()}/leaderboard`;
            try{
                (async () => {
                    const browser = await puppeteer.connect({browserWSEndpoint: 'wss://chrome.browserless.io/'});
                    const page = await browser.newPage();
                    await page.goto(url);
                    await page.waitForSelector('tbody > tr > td > a', {
                        visible: true,
                    });
                    const content = await page.content();
                    saveStats(content, limit, (stats) => onData(stats));
                    await browser.close();
                })();
              } catch(error){
                console.error('Error in async', error)
              }
        }
        function saveStats(data, limit, onStats) {
            var stats = new Array();
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            var rows = doc.getElementsByTagName('tr');
            var header = rows[0].getElementsByTagName('th');
            var headerItems = new Array();
            header.forEach(item => {
                headerItems.push(item.getAttribute('id'));
            });
            const rowsLength = limit + 1 <= rows.length ? limit + 1 : rows.length;
            for (let index = 1; index < rowsLength; index++) {
                const row = rows[index];
                var statRow = {};
                var tds = row.getElementsByTagName('td');
                var tdId = 0;
                tds.forEach(td => {
                    var key = headerItems[tdId];
                    var value = "";
                    if (td.getElementsByTagName('a').length > 0) {
                        value = td.getElementsByTagName('a')[0].textContent;
                    }
                    else {
                        value = td.textContent;
                    }
                    statRow[key] = value;
                    tdId++;
                });
                stats.push(statRow);
            }
            onStats(stats);
        }

        var Gamemode = (args[0]).toLowerCase();

        if (Gamemode === "pxlspace") {
          const url =`https://karmatop.de/addon/pxl-top.php`;
          fetch(url, {
              method: "GET",
              headers: {
                  Accept: "application/json",
              },
          })
        .then((res) => res.json())
        .then((data) => {
            const pxl = new Discord.MessageEmbed()
                .setTitle(`Top 10 • ${Gamemode}`)
                .setURL(`https://karmatop.de/addon/pxl-top.php`)
                .setDescription("Es werden nur Spieler in die Statistiken mit einbezogen, welche das Timolia Addon in LabyMod installiert haben. Dies sind keine offiziellen Statistiken.")
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp(message.createdAt)
                .setColor("#4680FC");
            data.forEach(function(item, index) {
                pxl.addFields({
                    name: `${index + 1}. ${item.name}`,
                    value: item.total + ` Blöcke`
                });
            });
            message.channel.send(pxl);
        });
      }

      if (Gamemode === `survivalquest`) {
        fetchLeaderboards(`${Gamemode}`, 10, (data) => {
            var embed = new Discord.MessageEmbed()
                .setTitle(`Top 10 • ${Gamemode}`)
                .setURL(`https://www.timolia.de/game/${Gamemode}/leaderboard`)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp(message.createdAt)
                .setColor("#4680FC");
            data.forEach(d => {
                embed.addFields(
                    {
                        name: `${d.rank} ${d.name}`, value: `Highscore: ${d.max_score}`
                    }
                );
            });
            message.channel.send(embed);
        });
      }
      
      else {
        fetchLeaderboards(`${Gamemode}`, 10, (data) => {
            var embed = new Discord.MessageEmbed()
                .setTitle(`Top 10 • ${Gamemode}`)
                .setURL(`https://www.timolia.de/game/${Gamemode}/leaderboard`)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
                .setTimestamp(message.createdAt)
                .setColor("#4680FC");
            data.forEach(d => {
                embed.addFields(
                    {
                        name: `${d.rank} ${d.name}`, value: `Punkte: ${d.points}`
                    }
                );
            });
            message.channel.send(embed);
        });
      }
    }
};

// Um die API für die Leaderboards zu nutzen ->

//var request = require('request');
//var options = {
//    'method': 'GET',
//    'url': 'https://www.timolia.de/api/leaderboard/',
//    'headers': {
//        'X-Requested-With': 'XMLHttpRequest',
//        'Cookie': 'hl=de'
//    }
//};
//request(options, function (error, response) {
//    if (error) throw new Error(error);
//    console.log(response.body);
//});