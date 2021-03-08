const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "boobs",
    description: "Random image of boobs",
    usage: "boobs",
    groups: ["nsfw"],
    aliases: ["tits"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Boobs')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            embed.setImage(await nsfw.boobs());
        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}