const { MessageEmbed } = require("discord.js");
const { inspect } = require('util');

module.exports = {
    name: "eval",
    description: "Evaluate entered code",
    usage: "eval <code>",
    groups: ["owner"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["ev"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Eval')
        .setColor(0x4B0082);

        let evaled;
        try {
          evaled = await eval(args.join(' '));
            embed.setDescription("```\n" + (args.join(" ")) + "\n```" + "```\n" + inspect(evaled) + "\n```")
          return message.reply(embed);
        }
        catch (error) {
          console.error(error);
          embed.setDescription('There was an error during evaluation.');
        }
    }
}