const { MessageAttachment } = require("discord.js");
const fs = require("fs");
const Waifu = require("waifulabs");

module.exports = {
    name: "waifu",
    description: "Gets a random waifu",
    usage: "waifu [seed]",
    groups: ["fun"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: [],
    run: async (client, message, args) => {
        // make the seed generation
        let genKey = Array(17).fill(Math.floor(Math.random() * (2^32-1)));
        if (args[0]) {
            genKey = Array(17).fill(Number(args[0]))
        }
        if (!Waifu.isValidSeed(genKey)) return client.err(message, "Waifu", "An invalid generation seed was passed");

        const waifu = await Waifu.generateBigWaifu(genKey);
        let res = new MessageAttachment(Buffer.from(waifu.image, 'base64'));
        message.reply(res);
    }
}