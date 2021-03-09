const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildsmanage",
    description: "manage the guilds the bot is on",
    usage: "guildsmanage list\nguildsmanage leave [guild id]",
    groups: ["owner"],
    aliases: ["mg"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Guilds')
        .setColor(0x4B0082);

// list guilds
        if (args[0] == "list") {
            let desc = "";
            for (let g of client.guilds.cache){
                desc += `${g[1].name}: ${g[1].id}\n`;
            }

            embed.setDescription("```\n" + desc + "\n```");
        }
// leave guild
        if (args[0] == "leave" && args[1]) {
            let g = client.guilds.cache.get(args[1]);
            embed.setDescription(`Left guild ${g.name}`)
            g.leave();
        }
        return message.reply(embed);
    }
}