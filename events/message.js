exports.run = async (client, message) => {
    if (message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return message.reply("Command not found");
    else{ 
        try {
            console.log(`Ran ${command.name} \[${args.join(" ")}\]- ${message.author.username}#${message.author.discriminator} \(${message.author.id}\)`);
            command.run(client, message, args);
        } catch (err) {
            client.channels.cache.get(client.config.logs.error).send({embed:{description:err}}).catch(console.error);
            message.channel.send(`Command \`${command.name}\` Failed Executing, Contact Support.`);
        }
    }
}