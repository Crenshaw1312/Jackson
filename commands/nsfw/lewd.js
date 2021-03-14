const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "lewd",
    description: "Random image som'n lewd",
    usage: "lewd",
    groups: ["nsfw"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Lewd')
        .setColor(0x4B0082)
        .setImage(await nsfw.lewd());
        
        return message.reply(embed);
    }
}