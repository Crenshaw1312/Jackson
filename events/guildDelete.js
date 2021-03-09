const { MessageEmbed } = require("discord.js")

exports.run = async (client, guild) => {
    let channel = client.channels.cache.get("818899863940366406");
    const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle(`Left Guild - ${guild.name}`);
    channel.send(embed);
}