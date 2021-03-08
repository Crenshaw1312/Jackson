const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const funcs = require('../../funcs.js');


module.exports = {
    name: "truth",
    description: "Gives a random truth",
    usage: "truth [pg|pg13|r]",
    groups: ["fun"],
    aliases: ["t"],
    run: async (client, message, args) => {

        // setting rating
        let rating = funcs.choose(args, ["pg", "pg13", "r"], null);

        let truth = (await fetch(`https://api.truthordarebot.xyz/truth?rating=${rating}`).then(response => response.json())).question;

        if (!truth)return client.err(message, "Truth", "No dare was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle("Truth")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating}`)
        .setDescription(truth);
        return message.reply(embed);
    }
}