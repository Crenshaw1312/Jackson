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
        .setColor(0x4B0082)
        .setImage(await nsfw.pgif());

        return message.reply(embed);
    }
}