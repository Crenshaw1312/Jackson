const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "koalafact",
    description: "Gives a random koala fact",
    usage: "koalafact",
    groups: ["fun", "animals"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: ["kf"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/koala").then(response => response.json())).fact;

        if (!fact) return client.err(message, "Koala Fact", "No koala fact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Koala Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}