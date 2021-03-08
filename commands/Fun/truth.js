const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "truth",
    description: "Gives a random truth",
    usage: "truth [pg|pg13|r]",
    groups: ["fun"],
    aliases: ["t"],
    run: async (client, message, args) => {
        // make random function
        function choose(options) {
            let choice = options[Math.floor(Math.random() * options.length)];
            if (!args) return choice;
            for (let option of options) {
                if (option === args[1] || options === args[0]) choice = option;
            }
            return choice;
        }
        // setting rating
        let rating = choose(["pg", "pg13", "r"]);

        let truth = (await fetch(`https://api.truthordarebot.xyz/truth?rating=${rating}`).then(response => response.json())).question;

        const embed = new MessageEmbed()
        .setTitle("Truth")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating}`)
        .setDescription(truth);
        return message.reply(embed);
    }
}