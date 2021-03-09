const { Guild } = require("discord.js")

exports.run = async (client, message) => {
    (Guild.prototype.systemChannel).send("hello");
}