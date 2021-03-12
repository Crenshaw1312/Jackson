const Discord = require("discord.js");
const client = new Discord.Client();
const { readdirSync } = require("fs");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.desciption = new Discord.Collection();
client.usage = new Discord.Collection();
client.groups = new Discord.Collection();
client.DM = new Discord.Collection();
client.cooldowns = new Map()

client.config = require("./config/config.js");

readdirSync("./handlers/").forEach(handler => {
    if (!handler.endsWith(".handler.js")) return;

    require(`./handlers/${handler}`)(client);
});

client.login(client.config.token);
