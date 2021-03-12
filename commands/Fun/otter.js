const gis  = require("g-i-s");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "otter",
    description: "Get an image of a random otter",
    usage: "otter",
    groups: ["fun"],
    DM: true,
    aliases: ["otot"],
    run: async (client, message, args) => {
        gis('cute otter', logResults);
        async function logResults(error, results){
            if (error)return client.err(message, "Otter", "No otters found");

            let random = Math.floor(Math.random() * results.length);
            let image = results[random].url

            const embed = new MessageEmbed()
            .setTitle('Otter')
            .setImage(image)
            .setColor(0x4B0082);
            return message.reply(embed);
        }
    }
}