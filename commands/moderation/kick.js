const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Bans given member",
    usage: "kick <user>",
    groups: ["moderation"],
    DM: false,
    cooldown: {type: "map", time: 0},
    aliases: [],
    run: async (client, message, args) => {

        if (!message.member.permissions.has('KICK_MEMBERS') || !message.member.permissions.has('ADMINISTRATOR')) return client.err(message, "Kick", 'You do not have permissons to kick');

        const embed = new MessageEmbed()
        .setTitle('Kick')
        .setColor(0x4B0082);

        if (!args[0])return client.err(message, "Kick", 'Please provide a user to kick');

        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase());
        
        if (!member)return client.err(message, "Kick", 'Could not find user');

        let reason = args[1];
        if (!args[0])return client.err(message, "Kick", 'Please provide a user to kick');
        if (!member.kickable)return client.err(message, "Kick", 'Could not find user');

        const memberTag = member.user.tag;

        member.kick({ reason: reason });
        embed.setDescription(`Kicked \`${memberTag}\` for reason: \`${reason}\``);
        return message.channel.send(embed);
    }
}