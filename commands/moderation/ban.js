const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans given member",
    usage: "ban <user>",
    groups: ["moderation"],
    aliases: [],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Ban')
        .setColor(0x4B0082);

        embed.setDescription('Please provide a user to ban');
        if (!args[0]) return message.reply(embed);

        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase());
        
        embed.setDescription('No user found');
        if (!member) return message.channel.send(embed);

        embed.setDescription('I cannot ban this user');
        if (!member.bannable) return message.channel.send(embed);

        let reason = args[1];
        if (!reason) reason = 'No reason provided.';

        const memberTag = member.user.tag;

        member.ban({ reason: reason });
        embed.setDescription('Banned \`${memberTag}\` for reason: \`${reason}\`');
        return message.channel.send(embed);
    }
}