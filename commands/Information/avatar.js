const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get the avatar of the triggering user or mentioned user",
    usage: "avatar [mention]",
    groups: ["information", "fun"],
    DM: false,
    aliases: ["av", "icon"],
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const embed = new MessageEmbed()
            .setColor(0x4B0082)
            .setTitle(`Avatar - ${user.username}`)
            .setFooter(`Ran by: ${message.author.username}`)
            .setImage(user.displayAvatarURL({dynamic: true}));
        return message.reply(embed);
    }
}