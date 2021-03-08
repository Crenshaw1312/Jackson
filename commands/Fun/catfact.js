const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "catfact",
    description: "Gives a random catfact",
    usage: "catfact",
    groups: ["fun"],
    aliases: ["cf"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://catfact.ninja/fact").then(response => response.json())).fact;

        if (!fact) return client.err(message, "CatFact", "No catfact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Cat Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}