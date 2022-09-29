const { SlashCommandBuilder, EmbedBuilder, Colors} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Gibt dir eine Liste über alle Timolia Community Discord Server'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} • Community Server`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
                [Timolia Achievements](https://discord.gg/t9Jny6ds3E)\n
                [JumpWorld Community](https://discord.gg/Y6DGketZYV)\n
                [Timolia Zeitung](https://discord.gg/Hf98ysqDCD)\n
                [Timolia Fails](https://discord.gg/cMJcCybQwR)\n
                [4rena Community](https://discord.gg/7SXq2EK8EP)\n
                [Splun Community](https://discord.gg/RGHcweAg2b)\n
                [Castles Community](https://discord.gg/dkDe6EKjNr)\n
                [SurvivalQuest Community](https://discord.gg/7EUxhJcuFh)\n
                [Arcade Community](https://discord.gg/pcky7gvQsP)\n
                [InTime Community](https://discord.gg/4b2Gg8h9cv)`
            )
            .setTimestamp(interaction.createdAt)
            .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
            .setColor(Colors.Blurple);
        interaction.reply({embeds: [embed]});
    },
};