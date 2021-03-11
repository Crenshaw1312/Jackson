const database = require("quick.db");
const config = require('../config/config.js');

exports.run = async (client, message) => {
    // user isn't bot
    if (message.author.bot) return;

    let args = [];
    let clientMention = `<@!${client.user.id}>`;
    if (message.content == (clientMention))  return await client.commands.get("help").run(client, message, args);

    // prefix
    let prefix = await database.get(`${message.guild.id}.prefix`)
    if (!prefix) {
        prefix = client.config.prefix
        await database.set(`${message.guild.id}.prefix`, client.config.prefix);
    }
    if (message.content.startsWith(clientMention)) prefix = clientMention;
    if (!message.content.startsWith(prefix)) return;

    // setup args
    args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); 
    if (cmd.length === 0) return;
    
    // Configurable Jelly bean data :3
    client.jellybean = await database.get(`${message.guild.id}.jellybeandata`);

    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return message.reply("Command not found");
    else{ 
        message.channel.startTyping();
        try {
            // errors and overrides
            if (command.DM === false && !message.guild) return client.err(message, "DMs", "This command cannot be ran in DMs");
            if (command.DM === true && !message.guild) {
                console.log(`Ran (DM) ${command.name} \[${args.join(" ")}\]- ${message.author.username}#${message.author.discriminator} \(${message.author.id}\)`);
                command.run(client, message, args);
                return message.channel.stopTyping();
            }
            if (command.groups[0] == "nsfw" && !message.channel.nsfw) return client.err(message, "NSFW", "This is not a NSFW channel");
            if (command.groups[0] == "owner" && message.author.id !== '766385575530856458') return client.err(message, "Crenshaw Only", "This command can only be run by the bot owner Crenshaw#1312");

            // no overrides or nsfw filters stopped the command, run normally
            console.log(`Ran (guild) ${command.name} \[${args.join(" ")}\]- ${message.author.username}#${message.author.discriminator} \(${message.author.id}\)`);
            command.run(client, message, args);
            return message.channel.stopTyping();
        } catch (err) {
            console.log(err);
        }
    }
}