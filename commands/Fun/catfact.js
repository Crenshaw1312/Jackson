const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "catfact",
    description: "Gives a random cat fact",
    usage: "catfact",
    groups: ["fun", "animals"],
    DM: true,
    cooldown: {type: "map", time: 3},
    aliases: ["cf"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/cat").then(response => response.json())).fact;

        if (!fact) return client.err(message, "cat fact", "No cat fact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('cat Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}