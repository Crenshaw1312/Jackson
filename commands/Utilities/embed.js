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

        const embed = new MessageEmbed();

        let fields = [];
        for (i = 0; 1 < 10; i++) {
            fields.push({name: `field${i}`, args: ["string", "string", "boolean"]})
        }
        let options = fields.concat([
            {name: "title", args: "string"},
            {name: "desc", args: "string"},
            {name: "footer", args: "string"},
            {name: "title", args: "string"},
            {name: "author", args: "string"},
        ]);

        console.log(options);

        let embedData = await flagParse(options, args.join(" "));
        let fieldData = embedData.keys().filter(embedItem => embedItem.startsWith("field"));
        for (let field of fieldData) {
            field = embedData.get(field);
            embed.addField(field);
        }

        message.reply(embed);
    }
}