const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "birdfact",
    description: "Gives a random bird fact",
    usage: "birdfact",
    groups: ["fun", "animals"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: ["bf"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/bird").then(response => response.json())).fact;

        if (!fact) return client.err(message, "Bird Fact", "No bird fact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Bird Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}