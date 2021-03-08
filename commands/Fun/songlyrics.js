const { MessageEmbed } = require("discord.js");
const { searchSong, getSong } = require('genius-lyrics-api');
const fetch = require('node-fetch');
const querystring = require('querystring');
const YouTube = require("simple-youtube-api");

const youtube = new YouTube("AIzaSyDqrUGStuNvVZ12njTl_4ArBN0dQhPYROw");
const options = {
    apiKey: 's3SVZNVUvyDfnoUng9GU7T4NzgXCQUi2BvIzO7GxhIyNWSFN0tZMH_THRVLkEvVV',
    title: "",
    artist: "",
    optimizeQuery: true
};

module.exports = {
    name: "lyrics",
    description: "Gets lyrics and album art to seach entry from youtube",
    usage: "lyrics <song name>",
    groups: ["fun", "music"],
    aliases: ["lyr"],
    run: async (client, message, args) => {
        
        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        embed.setTitle('Lyrics');
        
        if (args[0]) {
            let info = args.join(" ")
            //format seach entry
            if (info.match(", ")) {
                info = (info.split(", "));
                options.title = info[1];
                options.artist = info[0];
            }else{
                options.title = info;
            }
            // Search for it on YT
            let result = (await youtube.searchVideos(args.join(" ")))[0];
            if (result) {
                // get from song.link api
                const link = querystring.stringify({ term: `https://www.youtube.com/watch?v=${result.id}` });
                result = await fetch(`https://api.song.link/v1-alpha.1/links?url=${link}`).then(response => response.json());
                let first = (Object.keys(result.entitiesByUniqueId))[0];

                // set title and name
                info = result.entitiesByUniqueId[first];
                options.title = info.title;
                options.artist = info.artistName;
                let song = await getSong(options);

                if (song.lyrics.length > 2040){
                    song.lyrics = song.lyrics.slice(0, 2038) + "...";
                }

                // Make embed title look cool, thanks Devnote
                const msg = `${options.title}\nBy: ${options.artist}`;
                let titled = "";
                msg.split(' ').forEach(w => {
                    titled += w.split('')[0].toUpperCase() + w.slice(1) +" ";
                });

                // set up hyper-links for where song is available
                let platforms = result.linksByPlatform
                let hyperLinks = []
                for ( let platform of Object.keys(platforms)) {
                    hyperLinks.push(`\[${platform}\]\(${platforms[platform].url}\)`);
                }
                let group1 = hyperLinks.slice(7).join("\n");
                let group2 = hyperLinks.slice(0, 7).join("\n");

                //  finalize  embed
                embed.setURL(result.pageUrl);
                embed.setTitle(titled.trim());
                embed.setThumbnail(song.albumArt);
                embed.setDescription(song.lyrics);
                embed.addField("Available On:", group2, true);
                embed.addField("\(continued\)", group1, true);

                
            }else{
                embed.setDescription('No results.');
            }
        }else{
            embed.setDescription('Please provide the artist and title split by a comma\n`lyrics robert grace, fake fine`\n`or just the title: `lyrics fake fine`')
        }
        return message.reply(embed);
    }
}