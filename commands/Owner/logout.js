const { MessageEmbed, Permissions } = require("discord.js");
const { inspect } = require('util');

module.exports = {
    name: "logout",
    description: "Makes Jackson logout",
    usage: "logout",
    groups: ["owner"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["shutdown", "leave", "off"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Goodnight Crenshaw')
        .setDescription("see you soon")
        .setColor(0x4B0082);
        await message.reply(embed);

        console.log("Jackson is offline")

        return client.destroy()    
    }
}