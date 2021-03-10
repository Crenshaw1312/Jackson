const { MessageEmbed, Guild } = require("discord.js");
const { database } = require("quick.db");

exports.run = async (client, guild) => {
    let channel = client.channels.cache.get("818899863940366406");

    await database.delete(`${guild.id}`);

    const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle(`Left Guild - ${guild.name}`);
    channel.send(embed);
}