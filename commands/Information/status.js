const { MessageEmbed } = require("discord.js");
const database = require("quick.db");
const ms = require('ms');

module.exports = {
    name: "status",
    description: "Show the status of the bot",
    usage: "status",
    groups: ["information"],
    DM: true,
    aliases: ["stats"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Status')
        .setColor(0x4B0082)
        .addFields(
            {name: "Uptime", value: `${ms(client.uptime)}`,inline: true},
            {name: "Database", value: `quick.db ${database.version}`, inline: true},
            {name: "Totals", value: `Users: ${client.users.cache.size}\nChannels: ${client.channels.cache.size}\nGuilds: ${client.guilds.cache.size}`, inline: false}
        );
        return message.reply(embed);
    }
}