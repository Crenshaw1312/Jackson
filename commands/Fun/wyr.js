const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "wouldyourather",
    description: "Gives a random would you rathe question",
    usage: "wouldyourather [pg|pg13|r]",
    groups: ["fun"],
    aliases: ["wyr"],
    run: async (client, message, args) => {
        // make random function
        function choose(options) {
            let choice = options[Math.floor(Math.random() * options.length)];
            if (!args) return choice;
            for (let option of options) {
                if (option == args[0]) choice = option;
            }
            return choice;
        }
        // setting rating
        let rating = choose(["pg", "pg13", "r"]);

        let wyr = (await fetch(`https://api.truthordarebot.xyz/wyr?rating=${rating}`).then(response => response.json())).question;

        if (!wyr)return client.err(message, "Would you Rather", "No would you rather was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle("Would You Rather")
        .setColor(0x4B0082)
        .setFooter(`Rating: ${rating}`)
        .setDescription(wyr.replace("Would you rather ", ""));
        return message.reply(embed);
    }
}