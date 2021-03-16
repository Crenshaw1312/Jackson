const { MessageEmbed } = require("discord.js");
const { flagParse } = require("../../config/flagParser.js");

module.exports = {
    name: "embed",
    description: "Makes an embed",
    usage: "embed",
    groups: ["utilites"],
    DM: true,
    cooldown: {type: "map", time: 5},
    aliases: ["em"],
    run: async (client, message, args) => {
        if (!args[0]) return client.err(message, "Embed", "No flags provided\n```\n-author <string>\n-title <string>\n-description <string>\n-footer <string>\n-color <color name or hex>\n-field1 <string> <string> <booleen>\n-field2 <string> <string> <booleen>\n-field3....\n```");

        let flags = [
            {name: "title", args: ["string"]},
            {name: "description", args: ["string"]},
            {name: "footer", args: ["string"]},
            {name: "title", args: ["string"]},
            {name: "author", args: ["string"]},
            {name: "color", args: ["string"]},
        ];
        let fields = [];
        for (i = 1; i < 10; i++) {
            fields.push({name: `field${i}`, args: ["string", "string", "boolean"]})
        }
        flags = flags.concat(fields);

        let embedData = await flagParse(flags, args.join(" "));

        // add found data to the embed
        const embed = new MessageEmbed();
        for (let current of embedData.keys()) {
            let value = embedData.get(current);
            // Basics
            switch (current) {
                case "author": embed.setAuthor(value[0]);
                    break;
                case "title": embed.setTitle(value[0]);
                    break;
                case "description": embed.setDescription(value[0]);
                    break;
                case "color": embed.setColor(value[0]);
                    break;
                case "footer": embed.setFooter(value[0]);
                    break;
            }

            // Fields
            if (current.startsWith("field")) {
                embed.addField(value[0], value[1], value[2])
            }
        }

        message.reply(embed);
    }
}