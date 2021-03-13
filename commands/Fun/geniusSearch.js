const { MessageEmbed } = require("discord.js");
const { searchSong } = require('genius-lyrics-api');

module.exports = {
    name: "geniussearch",
    description: "Searches Genius Lyrics for  a song and links them.",
    usage: "songsearch <song name>",
    groups: ["fun", "music"],
    DM: false,
    cooldown: {type: "map", time: 5},
    aliases: ["gs"],
    run: async (client, message, args) => {
        const options = {
            apiKey: client.config.geniusToken,
            title: "",
            artist: "",
            optimizeQuery: true
        };

        const embed = new MessageEmbed()
        .setTitle('Genius Search')
        .setColor(0x4B0082);

        if (!args[0])return client.err(message, "Genius Search", "Please provide a search");
        // format seach
        if ((args.join(" ")).match(", ")){
            let info = (args.join(" ")).split(", ");
            options.title = info[1];
            options.artist = info[0];
        }else{
            options.title = args.join(" ");
        }

        // actually search
        let songs = await searchSong(options);
        let desc = "";
        for (let song of songs) {
            desc += `\[${song.title}\]\(${song.url}\)\n`
        }
        embed.setDescription(desc);

        return message.reply(embed);
    }
}