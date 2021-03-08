const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Show the websocket ping in milliseconds",
    usage: "ping",
    groups: ["information"],
    DM: true,
    aliases: ["pong", "p"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Ping')
        .setColor(0x4B0082)
        .setDescription(`Websocket ${client.ws.ping}ms`);
        return message.reply(embed);
    }
}