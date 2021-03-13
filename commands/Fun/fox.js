const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "fox",
    description: "Gives a random fox",
    usage: "fox",
    groups: ["fun"],
    DM: true,
    cooldown: {type: "map", time: 3},
    aliases: [],
    run: async (client, message, args) => {
        let fox = (await fetch("https://randomfox.ca/floof/").then(response => response.json())).image;

        if (!fox) return client.err(message, "Fox", "No fox returned, try again or get support");
        const embed = new MessageEmbed()
        .setTitle('Fox')
        .setColor(0x4B0082)
        .setImage(fox);
        return message.reply(embed);
    }
}