const { MessageEmbed } = require("discord.js");
const { fetchMessages } = require("../../config/funcs.js");

module.exports = {
    name: "purge",
    description: "Delete within the last 100 messages",
    usage: "purge <amount> [@user] [contains]",
    groups: ["moderation"],
    DM: true,
    cooldown: {type: "map", time: 2},
    aliases: ["clean", "wipe"],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.err(message, "Purge", 'You do not have permissons to purge');
        if (!args) return client.err(message, "Purge", "Please provide an amount of messages to delete");
        
        // Fine the number
        let amount = (args[0] || "1");
        amount = Number(amount.match(/^[0-9]+$/gm));
        if (amount < 2 || amount > 100) client.err(message, "Purge", "Amount must be from 2 to 100");

        let messages = await fetchMessages(message.channel, amount);
        for (let msg of messages) {
            msg.delete();
        }
        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Purge")
        .setDescription(`Deleted \`${amount}\` messages`);
        return message.reply(embed);
    }
}