const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "pandafact",
    description: "Gives a random panda fact",
    usage: "pandafact",
    groups: ["fun", "animals"],
    DM: true,
    aliases: ["pf"],
    run: async (client, message, args) => {
        let fact = (await fetch("https://some-random-api.ml/facts/panda").then(response => response.json())).fact;

        if (!fact) return client.err(message, "Panda Fact", "No pandafact returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Panda Fact')
        .setColor(0x4B0082)
        .setDescription(fact);
        return message.reply(embed);
    }
}