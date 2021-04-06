const fs = require('fs');
const got = require("got");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "viewcode",
    description: "View the code of a command",
    usage: "viewcode <command name/alias>",
    groups: ["information"],
    DM: true,
    cooldown: {type: "map", time: 10},
    aliases: ["vc"],
    run: async (client, message, args) => {
        let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
		if (!command) return client.err(message, "ViewCode", "Command not found");

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).indexOf(`${command.name}.js`) > -1);
        const url = `https://raw.githubusercontent.com/Crenshaw1312/Jackson/main/commands/${folderName}/${command.name}.js`

        // Get the Code
        let code = await got(url);
        code = code.body;
        if (code.length > 2040) {
            code = "Command was too large, please just click the link above"
        }

        const embed = new MessageEmbed()
        .setTitle("ViewCode")
        .setColor(0x4B0082)
        .setURL(url)
        .setDescription(`\`\`\`js\n${code}\n\`\`\``);
        return message.reply(embed);
    }
}