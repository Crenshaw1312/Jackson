const { MessageEmbed } = require("discord.js");
const { inspect } = require('util');

module.exports = {
    name: "eval",
    description: "Evaluate entered code",
    usage: "eval <code>",
    groups: ["owner"],
    aliases: ["ev"],
    run: async (client, message, args) => {
        if (message.author.id !== '766385575530856458') return;

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