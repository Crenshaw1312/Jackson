const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const Waifu = require("waifulabs");

module.exports = {
    name: "randomwaifu",
    description: "gets a random waifu",
    usage: "randomwaifu",
    groups: ["fun"],
    DM: true,
    aliases: ["randwaifu", "rwaifu"],
    run: async (client, message, args) => {
        // setup waifu stuph
        let genKey = [];
        for (i = 0; i < 17; i++) {
            genKey.push(Math.floor(Math.random() * 100));
        }
        const waifu = await Waifu.generateBigWaifu(genKey);
        let res = new MessageAttachment(Buffer.from(waifu.image, 'base64'));
        message.reply(res);
    }
}