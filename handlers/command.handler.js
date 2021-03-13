const { readdirSync } = require("fs");
const chalk = require("chalk");

module.exports = async client => {

    readdirSync("./commands/").forEach(dir => {
        readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js")).forEach(cmd => {
            const command = require(`../commands/${dir}/${cmd}`);
            if (!command.name) console.log(chalk.redBright(`Failed to load command handler ${cmd}`));
            else {
                client.commands.set(command.name, command);
                console.log(chalk.greenBright(`Loaded ${command.name}`));

                // making the aliases collection
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => client.aliases.set(alias, command.name));
                }

                // making the groups map
                if (command.groups && Array.isArray(command.groups)) {
                    for (let group of command.groups) {
                        if (!client.groups.get(group)) {
                            client.groups.set(group, [command]);
                            continue
                        }
                        client.groups.get(group).push(command);
                    };
                }
            }
        });
    });
}
