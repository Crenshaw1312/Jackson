const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "foxfact",
    description: "Gives a random fox fact",
    usage: "fox fact",
    groups: ["fun", "animals"],
    DM: true,
    aliases: ["f"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/fox").then(response => response.json())).fact;

        if (!fact) return client.err(message, "Fox Fact", "No fox fact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Fox Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}