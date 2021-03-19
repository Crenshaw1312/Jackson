const { MessageEmbed } = require("discord.js");
const welcomeSchema = require("../../schemes/welcomeSchema.js");
console.log(welcomeSchema)

module.exports = {
    name: "setwelcome",
    description: "Setsup welcome in channel it's being run in",
    usage: "setwelcome <message>",
    groups: ["utilities"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["setwelc"],
    run: async (client, message, args) => {

        // check requirements
        if (!message.member.hasPermission("ADMINISTRATOR")) return client.err(message, "Set Welcome", "You don't have the permissons to set the welcome message");
        if (!args[0]) return client.err(message, "Set Welcome", "Please enter a welcome message");

        // database
            console.log("sttempting saving somewhere...")
            await new welcomeSchema({
              guildId: message.guild.id,
              channelId: message.channel.id,
              text: args.join(" "),
            }).save();
            console.log("saved somewhere...")

        // send confirmation
        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Set Welcome")
        .setDescription(`Welcome message has been set to:\n\`\`\`\n${args.join(" ")}\n\`\`\``);
        message.reply(embed)

    }
}