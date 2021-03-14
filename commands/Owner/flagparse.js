const { MessageEmbed } = require("discord.js");
const { flagParse } = require("../../config/flagParser.js");

module.exports = {
    name: "flagparse",
    description: "Evaluate entered code",
    usage: "invite",
    groups: ["utilites"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["fparse"],
    run: async (client, message, args) => {

        let parse = await flagParse([
            {name: "good", args: ["string", "boolean"]},
            {name: "bad", args: ["string", "number"]}
        ], args.join(" "));

        const embed = new MessageEmbed()
        .setTitle('Flag Parse')
        .setDescription(`noFlags: ${parse.get("noFlag")}\nGood: ${parse.get("good")}\nbad: ${parse.get("bad")}\n`)
        .setColor(0x4B0082);
        message.reply(embed);
    }
}