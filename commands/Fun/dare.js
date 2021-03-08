const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const funcs = require('../../funcs.js');

module.exports = {
    name: "dare",
    description: "Gives a random dare, can specify if irl or discord and rating.",
    usage: "dare [pg|pg13|r] [irl|d]",
    groups: ["fun"],
    aliases: ["d"],
    run: async (client, message, args) => {
        // setting rating
        let rating = funcs.choose(args, ["pg", "pg13", "r"], null);
        let type = funcs.choose(args, ["d", "irl"], rating);

        let dare = (await fetch(`https://api.truthordarebot.xyz/dare?rating=${rating}&type=${type}`).then(response => response.json())).question;

        if (!dare)return client.err(message, "Dare", "No dare was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle("Dare")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating} - Type: ${type}`)
        .setDescription(dare);
        return message.reply(embed);
    }
}