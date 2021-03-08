const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "porngif",
    description: "Random image of porngif",
    usage: "porngif",
    groups: ["nsfw"],
    aliases: ["pgif"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('PornGIF')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            embed.setImage(await nsfw.pgif());
        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}