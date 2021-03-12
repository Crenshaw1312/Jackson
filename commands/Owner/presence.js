const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "presence",
    description: "Set the presence of Jackson",
    usage: "pres <title> <entry>",
    groups: ["owner"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["pres"],
    run: async (client, message, args) => {

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