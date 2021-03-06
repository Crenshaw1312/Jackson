const {MessageEmbed} = require('discord.js');

module.exports = async client => {
    client.err = (message, title, error) => {
        const embed = new MessageEmbed()
            .setTitle(`Error - ${title}`)
            .setDescription(error)
            .setColor(0x4B0082);
            message.channel.stopTyping(true);
        return message.reply(embed);
    }
}