const database = require("quick.db");
const chalk = require("chalk");

exports.run = async (client, guild, message) => {

    // jelly beans
    for (let guild of client.guilds.cache) {
        
        let guildJellyBeanData = await database.get(`${guild[1].id}.jellybeandata`);
        if (guildJellyBeanData) {
            console.log(chalk.blueBright(`Jackson Jelly Bean activated for ${guild[1].name}`));
        } else {
            await database.set(`${guild[1].id}.jellybeandata`, {
                maxGive: client.config.jellybeans.maxGive,
                maxTake: client.config.jellybeans.maxTake});
            console.log(chalk.blueBright(`Jackson Jelly Bean created for ${guild[1].name}`));
        }
    }

    // presence
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "jack help",
            type: "PLAYING"
        }
    });
    console.log(chalk.yellow("Set Presence"));

    console.log("Jackson is online");
}