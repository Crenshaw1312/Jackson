const { MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const querystring = require("querystring");
const fetch = require("node-fetch");

module.exports = {
    name: "songavailable",
    description: "Show where a song is available",
    usage: "songavailable <song search>",
    groups: ["information"],
    DM: true,
    aliases: ["songav", "sav"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);
        const youtube = new YouTube(client.config.youtubeToken);

        if (!args) return client.err(message, "Song Available", "Please provide a search");

        let musicVideo = await youtube.searchVideos(args.join(" "));

        if (!musicVideo) return client.err(message, "Song Available", "No results");

        embed.setTitle(`Song Available - ${musicVideo[0].title}`);

        musicVideo = querystring.stringify({term: `https://www.youtube.com/watch?v=${musicVideo[0].id}`});
        musicVideo = await fetch(`https://api.song.link/v1-alpha.1/links?url=${musicVideo}`).then(response => response.json());
        if (!musicVideo) return client.err(message, "Song Available", "No results");

        let desc = [];
        let allPlatformsData = musicVideo.linksByPlatform
        let allPlatformsNames = Object.keys(allPlatformsData);
        for (let platform of allPlatformsNames) {
            desc.push(`[${platform}](${allPlatformsData[platform].url})`);
        }
        let splitAt = Math.ceil(allPlatformsNames.length / 2);
        embed.addFields(
            {name: "_ _", value: desc.slice(0, splitAt).join("\n"), inline: true},
            {name: "_ _", value: desc.slice(splitAt).join("\n"), inline: true},
        );
        let thumbKeys = Object.keys(musicVideo.entitiesByUniqueId);
        embed.setThumbnail(musicVideo.entitiesByUniqueId[thumbKeys[0]].thumbnailUrl);

        return message.reply(embed);
    }
}