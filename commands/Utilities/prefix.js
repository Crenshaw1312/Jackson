const { MessageEmbed } = require("discord.js");
const database = require("quick.db");

module.exports = {
    name: "prefix",
    description: "Show the websocket ping in milliseconds",
    usage: "prefix [new prefix]",
    groups: ["utilites"],
    DM: true,
    aliases: ["setprefix"],
    run: async (client, message, args) => {

        // error and invalid entries
        if (!message.member.permissions.has('MANAGE_GUILD')) return client.err(message, "Prefix", 'You do not have permissons to change the prefix');
        if (!args[0]) return client.err(message, "Prefix", `Prefix unchanged\nprefix: ${client.config.prefix}`);
        if (args.length > 1) return client.err(message, "Prefix", "Prefix cannot cotain spaces");

        if (args[0] !== "reset") {
            await database.set(`prefix_${message.guild.id}`, args[0]);
        } else {
            await database.delete(`prefix_${message.guild.id}`);
        }

        const embed = new MessageEmbed()
        .setTitle("Prefix")
        .setColor(0x4B0082)
        .setDescription(`Prefix has been set to: ${args[0]}`);
        return message.reply(embed);
    }
}