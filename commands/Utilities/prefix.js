const { MessageEmbed } = require("discord.js");
const database = require("quick.db");
const config = require("../../config/config");

module.exports = {
    name: "prefix",
    description: "Show the websocket ping in milliseconds",
    usage: "prefix [new prefix|reset]",
    groups: ["utilites"],
    DM: false,
    cooldown: {type: "map", time: 0},
    aliases: ["setprefix"],
    run: async (client, message, args) => {

        // error and invalid entries
        if (!message.member.permissions.has('MANAGE_GUILD')) return client.err(message, "Prefix", 'You do not have permissons to change the prefix');
        if (!args[0]) return client.err(message, "Prefix", `Prefix unchanged\nprefix: ${database.get(`${message.guild.id}.prefix`)}`);
        if (args.length > 1) return client.err(message, "Prefix", "Prefix cannot cotain spaces");

        if (args[0] !== "reset") {
            await database.set(`${message.guild.id}.prefix`, args[0]);
        } else {
            await database.set(`${message.guild.id}.prefix`, client.config.prefix);
        }

        const embed = new MessageEmbed()
        .setTitle("Prefix")
        .setColor(0x4B0082)
        .setDescription(`Prefix has been set to: ${await database.get(`${message.guild.id}.prefix`) || client.config.prefix}`);
        return message.reply(embed);
    }
}