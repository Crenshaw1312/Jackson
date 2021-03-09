const { Guild } = require("discord.js")

exports.run = async (client, message) => {
    let channel = guild.systemChannel;
    if(!channel) return;
    channel.send('Hello! my name is Jackson, my prefix is `jack`!\n-Crenshaw#1312');
}