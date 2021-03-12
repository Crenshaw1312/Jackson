const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "dogfact",
    description: "Gives a random dog fact",
    usage: "dogfact",
    groups: ["fun", "animals"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: ["df"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/dog").then(response => response.json())).fact;

        if (!fact) return client.err(message, "dog fact", "No dog fact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Dog Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}