const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "hentai",
    description: "Gets hentai image",
    usage: "hentai [ass|thigh|midriff]",
    groups: ["nsfw"],
    aliases: ["hen"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Hentai')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            let pic = "";
            if (args[0]) {
                if (args[0] == "ass") {pic = await nsfw.hentaiass()}
                if (args[0] == "thigh") {pic = await nsfhen.hentaithigh()}
                if (args[0] == "midriff") {pic = await nsfw.hmidriff()}
            } else {pic = await nsfw.hentai()}
            embed.setImage(pic);
        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}