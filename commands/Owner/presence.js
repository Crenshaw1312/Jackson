const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "presence",
    description: "Set the presence of Jackson",
    usage: "pres <title> <entry>",
    groups: ["owner"],
    aliases: ["pres"],
    run: async (client, message, args) => {
        if (message.author.id !== '766385575530856458') return;

            client.user.setPresence({
                status: 'online',
                activity: {
                    name: args.join(" "),
                    type: "PLAYING"
                }
                
            });
            const embed = new MessageEmbed()
            .setTitle("Presence")
            .setColor(0x4B0082)
            .setDescription(`Prensence has been set to \`${args.join(" ")}\``);
            return message.reply(embed);
        }
    }