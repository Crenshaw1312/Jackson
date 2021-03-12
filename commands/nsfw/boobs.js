const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "boobs",
    description: "Random image of boobs",
    usage: "boobs",
    groups: ["nsfw"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: ["tits"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Boobs')
        .setColor(0x4B0082)
        .setImage(await nsfw.boobs());

        return message.reply(embed);
    }
}