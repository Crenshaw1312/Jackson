const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const { choose } = require('../../config/funcs.js');


module.exports = {
    name: "truth",
    description: "Gives a random truth",
    usage: "truth [pg|pg13|r]",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 5},
    aliases: ["t"],
    run: async (client, message, args) => {

        // setting rating
        let rating = await choose(args, ["pg", "pg13", "r"], null);

        let truth = (await fetch(`https://api.truthordarebot.xyz/truth?rating=${rating}`).then(response => response.json())).question;

        if (!truth)return client.err(message, "Truth", "No truth was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle("Truth")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating}`)
        .setDescription(truth);
        return message.reply(embed);
    }
}