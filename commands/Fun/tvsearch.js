const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const { flagParse } = require("../../config/flagParser.js");
module.exports = {
    name: "tvsearch",
    description: "Search for show or movie",
    usage: "tvsearch <search>",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 10},
    aliases: ["tvs"],
    run: async (client, message, args) => {

        if (!args[0]) return client.err(message, "TV Search", "Please provide a search\n```\n-year <year>\n-type (1 = movie, 2 = series, 3 = episode)\n```");

        // Flag management
        let flags = [
            {name: "year", args: ["number"]},
            {name: "type", args: ["number"]}
        ]
        let paramters = await flagParse(flags, args.join(" "));
        console.log(paramters)
        // getting the actual search
        let term = paramters.get("noFlag")
        if (!term) {
            return client.err(message, "TV Search", "Please provide a search");
        } else {
            term = term.join(" ")
        }
        let search = querystring.stringify({term: term})
        // getting the year
        let year = "";
        if (paramters.get("year")) year = paramters.get("year")[0];
        // getting the type
        let type = "";
        if (paramters.get("type")) {
            switch (paramters.get("type")[0]) {
                case 1:
                    type = "&type=movie";
                    break;
                case 2:
                    type = "&type=series";    
                    break;
                case 3:
                    type = "&type=episode";
                    break;
                default:
                    return client.err(message, "TV Search", "Invalid type\n```\n1 = movie\n2 = series\n3 = episode\n```")
            }
        }

        let movie = await fetch(`http://www.omdbapi.com/?t=${search.slice(5)}${type}${year}&plot=full&apikey=${client.config.omdbToken}`)
        .then(function (response) {
          return response.json();
        });

        if (movie.Response == 'False') return client.err(message, "TV Search", "No tv show or movie was returned");

        let ratings = "";
        for (let rating of movie.Ratings) {
            ratings += `**${rating.Source}:** ${rating.Value}\n`
        }
        let url = movie.Website
        if (url = 'N/A') url = `https://www.imdb.com/title/${movie.imdbID}/`

        const embed = new MessageEmbed()
        .setTitle(`${movie.Title} - ${movie.Year}`)
        .setDescription(movie.Plot)
        .setURL(url)
        .setColor(0x4B0082)
        .addFields(
            {name: "Availablity", value: `**Countries:** ${movie.Country}\n**Languages:** ${movie.Language}`, inline: true},
            {name: "Ratings", value: ratings, inline: true},
            {name: "_ _", value: "_ _",},
            {name: "People", value: `**Director:** ${movie.Director}\n**Writers:** ${movie.Writer}\n**Actors:** ${movie.Actors}`, inline: false},
            {name: "Production", value: `**Company:** ${movie.Production}\n**Box Office:** ${movie.BoxOffice}\n**Awards:** ${movie.Awards}`},
        );

        if (movie.Poster !== 'N/A') embed.setThumbnail(movie.Poster);
        message.reply(embed);
    }
}