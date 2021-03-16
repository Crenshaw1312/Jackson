const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const NSFW = require("discord-nsfw");
const { choose } = require('../../config/funcs.js');
const nsfw = new NSFW();

module.exports = {
    name: "neko",
    description: "Random image of neko(s) (api isn't good, not nekos)",
    usage: "neko [feet|pussy|tits]",
    groups: ["nsfw"],
    DM: true,
    cooldown: {type: "map", time: 5},
    aliases: [],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('Neko')
        .setColor(0x4B0082);

        // get neko kind
        let neko = await choose(args, ["feet", "pussy", "tits"], null);
        embed.setFooter(`Neko Type: ${neko}`);

        // get the neko
        let pic = "";
        if (neko == "feet") {
            pic = await nsfw.nekofeet();
        } else if (neko == "pussy") {
            pic = await nsfw.nekopussy();
        } else if (neko == "tits") {
            pic = await nsfw.nekotits();
        }

            embed.setImage(pic);

        return message.reply(embed);
    }
}