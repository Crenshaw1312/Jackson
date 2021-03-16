const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const { fetchMessages } = require("../../config/funcs");

module.exports = {
    name: "remind",
    description: "Set a reminder",
    usage: "remind <duration> [remind message]",
    groups: ["information"],
    DM: false,
    cooldown: {type: "map", time: 5},
    aliases: ["rmnd"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Reminder");
        let time = args[0];
        if (!time) return client.err(message, "Remind", "Please provide a duration");

        const reminder = args.slice(1).join(" ") || "Hey! This is a message just to remind you of something";

        if (reminder) {
            embed.setDescription(`Reminder set`);
        }

        setTimeout(async function (){
            embed.setDescription(reminder)
            if (reminder.match(/\s-dm\s/ig)) return message.member.send(embed);
            await message.reply("");

            fetchMessages(message.channel, 1).then(messages => {
                for (let msg of messages) {
                    if (msg.content = `<@${message.author.id}>`) {
                        msg.delete();
                    }
                }
            });
            message.channel.send (embed);
        },ms(time));
    }
}