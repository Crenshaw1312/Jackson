const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "dare",
    description: "Gives a random dare, can specify if irl or discord and rating.",
    usage: "dare [pg|pg13|r] [irl|d]",
    groups: ["fun"],
    aliases: ["d"],
    run: async (client, message, args) => {
        // make random function
        function choose(options) {
            let choice = options[Math.floor(Math.random() * options.length)];
            if (!args) return choice;
            for (let option of options) {
                if (option == args[1] || options == args[0]) choice = option;
            }
            return choice;
        }
        // setting rating
        let rating = choose(["pg", "pg13", "r"]);
        let type = choose(["d", "irl"]);

        let dare = (await fetch(`https://api.truthordarebot.xyz/dare?rating=${rating}&type=${type}`).then(response => response.json())).question;

        if (!truth)return client.err(message, "Dare", "No dare was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle("Dare")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating} - Type: ${type}`)
        .setDescription(dare);
        return message.reply(embed);
    }
}