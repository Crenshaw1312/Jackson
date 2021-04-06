const { MessageEmbed } = require("discord.js");
const { findGroup } = require("../../config/funcs.js");
const guildsmanage = require("../Owner/guildsmanage.js");

module.exports = {
    name: "help",
    description: "Shows a basic help embed",
    usage: "help",
    groups: ["information"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["h"],
    run: async (client, message, args) => {
        //set-up
        const embed = new MessageEmbed()
        .setTitle('Do you have any purple jelly beans?')
        .setColor(0x4B0082)
        .setFooter(`Prefix is ${client.prefix}`);
        let desc = "";
        let nsfw = false;
        let groups = [];
        for (let group of client.groups.keys()) {
            groups.push(group)
        }

        // default help embed
        if (!args[0]) {
            embed.setDescription(desc);
            embed.addFields(
                { name: 'Information', value: "`help information`", inline: true },
                { name: 'Fun', value: "`help fun`", inline: true },
                { name: 'Moderation', value: "`help moderation`", inline: true },
                { name: 'NSFW', value: "`help nsfw`", inline: true },
                { name: 'Jelly Beans', value: "`help jellybean`", inline: true },
            )
            if (message.author.id == 766385575530856458) {
                embed.addFields({ name: "Owner", value: "`help owner`", inline: true });
            }

        // Command specific
        } else {
            let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
            if (command) {
                // indiviual command
                if ( command.groups.indexOf("nsfw") > -1) nsfw = true;
                embed.setTitle(`Help - ${command.name}`);
                embed.setDescription(`\`\`\`\nAliases ${command.aliases.join(", ")}\nUsage ${command.usage}\nCooldown: ${command.cooldown.time} seconds\nGroups: ${command.groups.join(" ")}\nDescription: ${command.description}\n\`\`\``);
            } else {
                // Groups
                let group = groups.find(group => group.toLowerCase() == args[0])
                if (!group) return client.err(message, "Help", "Command or group not found");
                for (let command of client.groups.get(group)) {
                    desc += `**${command.name}**, `
                }
                if (group == "nsfw") nsfw = true
                desc = "Use `jack help <command name>` for more on that command\n" + desc.slice(0, (desc.length - 2));
                embed.setTitle(`Help - ${group}`);
                embed.setDescription(desc);
            }
            if (message.guild) {
                if ( nsfw && !message.channel.nsfw) return client.err(message, "NSFW", "This is not a NSFW channel");
            }
            return message.reply(embed);
        }
        return message.reply(embed);
    }
}