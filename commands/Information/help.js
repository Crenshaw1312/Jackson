const { MessageEmbed } = require("discord.js");

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
        .setFooter("prefix is 'jack'");
        let desc = "";
        let groups = {"information":[], "jellybean": [], "animals": [], "utilites": [], "nsfw": [], "fun": [], "owner": [], "moderation": [], "music": []}; 
        for (let c of client.commands) {
            for (let g of c[1].groups) {
                groups[g].push(c[0]);
            }
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

            let command = client.aliases.get(args[0]);
            command = client.commands.get(command || args[0]);

            if (command) {
                embed.setTitle(`Help - ${command.name}`);
                embed.setDescription("```css\n" + `\#Aliases \[${command.aliases.join(", ")}\]\n\#Usage \[${command.usage}\]\n\#Description \[${command.description}\]` + "\n```");
            } else {
                // Groups
                if (!groups[args[0]]) return;
                let commands = groups[(args[0])];
                for (let c of commands) {
                    command = client.commands.get(c);
                    desc += `**${command.name}**, `
                }
                desc = "Use `jack help <command name>` for more on that command\n" + desc.slice(0, (desc.length - 2));
                embed.setTitle(`Help - ${args[0]}`);
                embed.setDescription(desc);
            }
            if ((command.groups[0] == "nsfw" || args[0] == "nsfw") && !message.channel.nsfw) return client.err(message, "NSFW", "This is not a NSFW channel");
        }
        return message.reply(embed);
    }
}