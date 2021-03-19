const fs = require('fs');
const path = require("path");
const { MessageEmbed } = require("discord.js");
const chalk = require('chalk');

module.exports = {
    name: "reload",
    description: "Makes Jackson reload commands",
    usage: "reload",
    groups: ["owner"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["refresh"],
    run: async (client, message, args) => {
        let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
		if (!command) return client.err(message, "Reload", "No command provided");

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).indexOf(`${command.name}.js`) > -1);

        commandPath = (path.join(process.cwd(), "commands", folderName, `${command.name}.js`));
		delete require.cache[require.resolve(commandPath)];

        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle(`Reload - ${command.name}`);
		try {
			const newCommand = require(commandPath);
			client.commands.set(newCommand.name, newCommand);
            console.log(chalk.greenBright(`Relaoded ${command.name}`));
			embed.setDescription("Relaod was successful");
		} catch (error) {
			console.log(chalk.redBright(`Reload failed ${command.name}\n--${error.message}`))
			embed.setDescription(`Reload failed\n${error.message}`);
		}
        return message.reply(embed);
	},
};