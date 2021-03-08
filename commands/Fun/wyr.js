const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const funcs = require('../../funcs.js');

module.exports = {
    name: "wouldyourather",
    description: "Gives a random would you rathe question",
    usage: "wouldyourather [pg|pg13|r]",
    groups: ["fun"],
    DM: false,
    aliases: ["wyr"],
    run: async (client, message, args) => {

        // setting rating
        let rating = funcs.choose(args, ["pg", "pg13", "r"], null);

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