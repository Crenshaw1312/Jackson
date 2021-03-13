const { MessageEmbed } = require("discord.js");
const { fetchMessages } = require("../../config/funcs.js");

module.exports = {
    name: "ping",
    description: "Show the websocket ping in milliseconds",
    usage: "ping",
    groups: ["information"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["pong", "p"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("Ping :ping_pong:")
        .setColor(0x4B0082);
    await message.reply(embed);
    
    let pingMessage = (await fetchMessages(message.channel, 1))[0];
    pingMessage.embeds[0].description = `Edit message: ${message.createdTimestamp- pingMessage.createdTimestamp}ms\nWebsocket is : ${Math.round(client.ws.ping)}ms`;
    pingMessage.edit({embed: pingMessage.embeds[0]});
    }
}