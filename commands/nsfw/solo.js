const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "solo",
    description: "Random image of solo nsfw",
    usage: "solo",
    groups: ["nsfw"],
    DM: true,
    cooldown: {type: "map", time: 5},
    aliases: ["masturbate"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Solo')
        .setColor(0x4B0082)
        .setImage(await nsfw.solo());
        
        return message.reply(embed);
    }
}