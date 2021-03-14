const database = require("quick.db");
const chalk = require("chalk");
const mongo = require("../config/mongo.js");
const { prefix } = require("../config/config.js");

exports.run = async (client) => {
    // mongo db
    await mongo().then(mongoose => {
        try {
            console.log(chalk.blueBright('MongoDB conected'));
        } finally {
            mongoose.connection.close();
        }
    });

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
    let statuses = [
        {name: `@${client.user.username} help`, type: "PLAYING"},
        {name: `${client.users.cache.size} users`, type: "WATCHING"},
        {name: `@${client.user.username} purge <amount> [@user]`, type: "PLAYING"}
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