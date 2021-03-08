const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "about",
    description: "Some general information about the bot",
    usage: "about",
    groups: ["information"],
    DM: true,
    aliases: ["info"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('About')
        .setColor(0x4B0082)
        .setDescription("Jackson is an information fetcher bot.It gets everything from youtube channels to reddit.\n\nJackson is the little boy in the pfp and his favourite candy are purple jelly beans, and so his imaniary friend, a gaint cat, Crenshaw,\n\nBot owner is Crenshaw#1312\nCredit: WaterNinja#2093 for truth command and teaching me.\nCredit: Devnote#0745 and Radeon team for helping me set up the bot and teaching me too.");
        return message.reply(embed);
    }
}