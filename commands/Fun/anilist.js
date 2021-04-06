const { MessageEmbed } = require("discord.js");
const anilist = require("anilist-node");
const Anilist = new anilist();

module.exports = {
    name: "anilist",
    description: "Fetch information frome anilist",
    usage: "anilist <manga/anime/m/a> <search>",
    groups: [""],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["al"],
    run: async (client, message, args) => {

        if (args.length < 2) return client.err(message, "Anilist", `Please provide the correct arguements:\n\`\`\`\nanilist <manga/anime/m/a> <search>\n\`\`\``);
        if (!args[0].match(/^(a|anime|m|manga)$/i)) return client.err(message, "Anilist", "You can only search anime or manga");

        let search = args.slice(1).join(" ")
        let result;        
        //Anime
        if (args[0].match(/a|anime/i)) {
            result = await Anilist.searchEntry.anime(search);
            result = await Anilist.media.anime(result.media[0].id);
        // Manga
        } else {
           result = await Anilist.searchEntry.manga(search);
           result = await Anilist.media.anime(result.media[0].id);
        }
        
        // no results
        if (result.status === 404) return client.err(message, "Anilist", "No result, please try another search");

        // setup for ranks, trailer, twitter
        let ranks = "";
        for (let rank of result.rankings) {
            ranks += rank.context.toLowerCase() + ": " + rank.rank + "\n";
        }
        let twitter = "";
        if (result.hashtag) {
            twitter = ` | [Twitter: ${result.hashtag}](https://twitter.com/hashtag/${result.hashtag.slice(1)})`
        }
        let trailer = "";
        if (result.trailer) {
            trailer = `[Trailer](${result.trailer}) | `
        }

        const embed = new MessageEmbed()
        .setTitle(result.title.userPreferred || result.title.english)
        .setURL(result.siteUrl)
        .setImage(result.bannerImage)
        .setColor(0x4B0082)
        .setDescription(result.description)
        .addFields(
            {name: "_ _", value: `${trailer}[Banner Image](${result.bannerImage})${twitter}`, inline: false},
            {name: `Quick Stats`, value: `Total Reviews: ${result.reviews.length}\nFavourited: ${result.favourites} times\nFormat: ${result.format}\nAdult: ${result.isAdult}\nStarted on: ${result.startDate.day}/${result.startDate.month}/${result.startDate.year} (d/m/y)\nTotal episodes: ${result.episodes} ~${result.duration}min long`, inline: true},
            {name: "Scores", value: `\On lists/Poplarity: ${result.popularity}\nAverage Score: ${result.averageScore}/100\nMean Score: ${result.meanScore}/100\n`, inline: true},
            {name: "Ranks", value: `${ranks}`, inline: false},
        );
        return message.reply(embed);
    }
}