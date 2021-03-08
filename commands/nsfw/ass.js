const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "ass",
    description: "Random image of ass",
    usage: "ass",
    groups: ["nsfw"],
    aliases: ["butt", "booty"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('ass')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            embed.setImage(await nsfw.ass());
        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}