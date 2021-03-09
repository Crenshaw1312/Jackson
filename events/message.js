const database = require("quick.db");
const config = require('../config/config.js');

exports.run = async (client, message) => {
    let prefix = await database.fetch(`prefix_${message.guild.id}`) || client.config.prefix;

    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return message.reply("Command not found");
    else{ 
        try {
            // errors and overrides
            if (command.DM === false && !message.guild) return client.err(message, "DMs", "This command cannot be ran in DMs");
            if (command.DM === true && !message.guild) {
                console.log(`Ran (DM) ${command.name} \[${args.join(" ")}\]- ${message.author.username}#${message.author.discriminator} \(${message.author.id}\)`);
                 return command.run(client, message, args);
            }
            if (command.groups[0] == "nsfw" && !message.channel.nsfw) return client.err(message, "NSFW", "This is not a NSFW channel");
            if (command.groups[0] == "owner" && message.author.id !== '766385575530856458') return client.err(message, "Crenshaw Only", "This command can only be run by the bot owner Crenshaw#1312");

            // no overrides or nsfw filters stopped the command, run normally
            console.log(`Ran (guild) ${command.name} \[${args.join(" ")}\]- ${message.author.username}#${message.author.discriminator} \(${message.author.id}\)`);
            command.run(client, message, args);
        } catch (err) {
            console.log(err);
        }
    }
}