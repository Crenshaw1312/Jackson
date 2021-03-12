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
    let possibleDisplay = ["fox", "lyrics", "truth", "define"];
    let random = possibleDisplay[Math.floor(Math.random() * possibleDisplay.length)];
    possibleDisplay = await client.commands.get(random);
    let statuses = [
        {name: "jack help", type: "PLAYING"},
        {name: `${client.guilds.cache.size} guilds`, type: "WATCHING"},
        {name: "jack help", type: "PLAYING"},
        {name: `jack ${possibleDisplay.usage}`, type: "PLAYING"}
    ];

    let i = 0;
    client.setInterval(() => {
         let status = statuses[i];
         if(!status){
             status = statuses[0];
             i = 0;
         }
         client.user.setPresence({
            status: 'online',
            activity: {
                name: status.name,
                type: status.type
            }
        });
         i++;
    }, 60000);
    console.log(chalk.yellow("Presence loop started"));

    console.log("Jackson is online");
}