const { MessageEmbed } = require("discord.js");
const hltb = require('howlongtobeat');

module.exports = {
    name: "howlongtobeat",
    description: "Show the websocket ping in milliseconds",
    usage: "howlongtobeat <game name>",
    groups: ["fun"],
    DM: true,
    cooldown: {type: "map", time: 3},
    aliases: ["hltb"],
    run: async (client, message, args) => {
        const hltbService = new hltb.HowLongToBeatService();
        const embed = new MessageEmbed()
        .setTitle('How Long To Beat')
        .setColor(0x4B0082);

        // require an entry
        if (!args) return client.err(message, "How Long To Beat", "Please provide a search");

        let foundGames = await hltbService.search(args.join(" "));
        if (!foundGames) return client.err(message, "How Long To Beat", "No results")
        let bestResult = false;
        let closeResults = 0;
        for (let game of foundGames) {
            if ((game.similarity * 100) > 65 && !bestResult) {
                bestResult = true;
                embed.setTitle(`How Long To Beat - ${game.name}`);
                embed.setThumbnail(`https://howlongtobeat.com${game.imageUrl}`);
                embed.setURL(`https://howlongtobeat.com/game?id=${game.id}`);
                embed.setDescription(`${game.description}\n**Times** (hours)\`\`\`\n\nMain: ${game.gameplayMain}\nMain + Extras: ${game.gameplayMainExtra}\nCompletionist: ${game.gameplayCompletionist}\n\`\`\`\n`);
            } else if (closeResults < 3){
                let sayMoreResults = "More Results:"
                if (closeResults > 0) sayMoreResults = "_ _";
                closeResults++
                embed.addField(`${sayMoreResults}`, `[${game.name}](https://howlongtobeat.com/game?id=${game.id})`, true);
            }
        }
        
        if (!bestResult) return client.err(message, "How Long To Beat", "There was no game found for your search");

        return message.reply(embed);
    }
}