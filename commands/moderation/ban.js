const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans given member",
    usage: "ban <user>",
    groups: ["moderation"],
    DM: false,
    aliases: [],
    run: async (client, message, args) => {
    
        if (message.member.permissions.has('BAN_MEMBERS') || message.member.permissions.has('ADMINISTRATOR')) return client.err(message, "Ban", 'You do not have permissons to ban');

        const embed = new MessageEmbed()
        .setTitle('ban')
        .setColor(0x4B0082);

        if (!args[0])return client.err(message, "ban", 'Please provide a user to ban');

        const member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase());
        
        if (!member)return client.err(message, "ban", 'Could not find user');

        let reason = args[1];
        if (!args[0])return client.err(message, "ban", 'Please provide a user to ban');
        if (!member.banable)return client.err(message, "ban", 'Could not find user');

        const memberTag = member.user.tag;

        member.ban({ reason: reason });
        embed.setDescription(`baned \`${memberTag}\` for reason: \`${reason}\``);
        return message.channel.send(embed);
    }
}