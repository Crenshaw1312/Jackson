const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: "define",
    description: "Gets definition from urban dictionary",
    usage: "define",
    groups: ["fun"],
    aliases: ["df", "urban", "ud"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);

        if (args[0]) {
            const query = querystring.stringify({ term: args.join(' ') });
            const urban = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
            const def = urban.list[Math.floor(Math.random() * urban.list.length)];

            if (def) {
                embed.setTitle(`Define - ${def.word}`);
                embed.setURL(def.permalink);
                embed.setDescription(`**Definition**\n${def.definition}\n\n**Example**\n${def.example}`);
                embed.setFooter(`👍 ${def.thumbs_up} 👎 ${def.thumbs_down} - ${def.author}`);
            } else {
                embed.setTitle("Define");
                embed.setDescription("No results");
            }
        } else {
            embed.setTitle("Define");
            embed.setDescription("Please provide a search");
        }
        return message.reply(embed);
    }
}