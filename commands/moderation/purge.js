const { MessageEmbed } = require("discord.js");
const { fetchMessages } = require("../../config/funcs.js");

module.exports = {
    name: "purge",
    description: "Delete within the last 100 messages",
    usage: "purge <amount> [@user] [contains]",
    groups: ["moderation"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["clean", "wipe"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.err(message, "Purge", 'You do not have permissons to purge');
        if (!args[0]) return client.err(message, "Purge", "Please provide an amount of messages to delete");
        
        // Fine the number
        let amount = Number(args[0].match(/^[0-9]+$/gm));
        if (amount < 2 || amount > 100) return client.err(message, "Purge", "Amount must be from 2 to 100");

        let targetUser = message.mentions.users.first();
        let messages = await fetchMessages(message.channel, 100);
        if (targetUser) messages = messages.filter(msg => msg.author.id == targetUser.id);
        message.channel.bulkDelete(messages);

        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Purge")
        .setDescription(`Deleted \`${amount}\` messages`);
        return message.reply(embed);
    }
}