const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: "neko",
    description: "Random image of neko(s) (api isn't good, not nekos)",
    usage: "neko [feet|pussy|tits]",
    groups: ["nsfw"],
    aliases: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Neko')
        .setColor(0x4B0082);

        if (message.channel.nsfw) {
            // get neko kind
            let neko = ["feet", "pussy", "tits"]
            neko = neko[Math.floor(Math.random() * neko.length)];
            let pic = "";
            if (args[0]) {
                if (args[0].match(/^(feet|pussy|tits)$/gm)) {
                    neko = args[0]
                } else {
                    embed.setDescription("Invalid neko type");
                    return message.reply(embed);
                }
            }
            embed.setFooter(`Neko Type: ${neko}`);

            // get the neko
            if (neko == "feet") {
                pic = await nsfw.nekofeet();
            } else if (neko == "pussy") {
                pic = await nsfw.nekopussy();
            } else if (neko == "tits") {
                pic = await nsfw.nekotits();
            }

            embed.setImage(pic);

        } else {
            embed.setDescription("This is not an nsfw channel");
        }
        return message.reply(embed);
    }
}