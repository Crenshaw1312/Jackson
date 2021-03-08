const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "pussy",
    description: "Random image of pussy",
    usage: "pussy",
    groups: ["nsfw"],
    aliases: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Pussy')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            embed.setImage(await nsfw.pussy());
        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}