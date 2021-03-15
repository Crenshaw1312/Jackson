const { MessageEmbed } = require("discord.js");
const { flagParse } = require("../../config/flagParser.js");

module.exports = {
    name: "embed",
    description: "Makes an embed",
    usage: "embed",
    groups: ["utilites"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["em"],
    run: async (client, message, args) => {

        let flags = [
            {name: "title", args: ["string"]},
            {name: "description", args: ["string"]},
            {name: "footer", args: ["string"]},
            {name: "title", args: ["string"]},
            {name: "author", args: ["string"]},
            {name: "color", args: ["string"]}
        ];

        let embedData = await flagParse(flags, args.join(" "));
        let provided = [];
        for (let key of embedData.keys()) provided.push(key);

        console.log(provided);

        const embed = new MessageEmbed();
        if (provided.includes("author")) embed.setAuthor(embedData.get("author")[0]);
        if (provided.includes("title")) embed.setTitle(embedData.get("title")[0]);
        if (provided.includes("description")) embed.setDescription(embedData.get("description")[0]);
        if (provided.includes("footer")) embed.setFooter(embedData.get("fppter")[0]);
        if (provided.includes("color")) embed.setColor(embedData.get("color")[0]);

        message.reply(embed);
    }
}