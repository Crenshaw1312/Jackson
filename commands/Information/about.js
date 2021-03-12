const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "about",
    description: "Some general information about the bot",
    usage: "about",
    groups: ["information"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["info"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('About')
        .setColor(0x4B0082)
        .setDescription("Jackson is an information fetcher bot." +
        "It gets everything from youtube channels to reddit." + 
        "\n\n**Why the name Jackson?**\nJackson is the little boy in the pfp and his favourite candy are purple jelly beans. " +
        "The big black cat is Crenshaw, his imaginary friend that is there for him as he deals with homelessness." +
        "Jackson also really likes facts, and animals, so to fit this my bot is an information fetcher and has plenty of animal commands too!" +
        "\n\nBot owner is Crenshaw#1312\n\n**Credits**\nWaterNinja#2093 for truth, dare, and wyr commands" + 
        "and teaching me.\nDevnote#0745 and Radeon team for helping me set up the bot and teaching me too.\n" +
        "Specky#6281 for teaching me and the npm for the waifu stuff");
        return message.reply(embed);
    }
}