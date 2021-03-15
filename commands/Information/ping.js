const { MessageEmbed } = require("discord.js");

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
    const msg = await message.reply(embed);
    msg.edit({embed:{
        title: "Ping :ping_pong:",
        description: `Edit message: ${msg.createdTimestamp - message.createdTimestamp}ms\nWebsocket is: ${client.ws.ping}ms`,
        color: 0x4B0082
    }})
    }
}
