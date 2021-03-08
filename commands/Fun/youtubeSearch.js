const YouTube = require("simple-youtube-api");
const { MessageEmbed } = require("discord.js");
const youtube = new YouTube("AIzaSyDqrUGStuNvVZ12njTl_4ArBN0dQhPYROw");

module.exports = {
    name: "youtubesearch",
    description: "Show the websocket ping in milliseconds",
    usage: "youtubesearch <search>",
    groups: ["fun"],
    aliases: ["yts"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle("YouTube")
        .setDescription("Please provide a search")
        .setColor(0x4B0082);

        if (args[0]) {
            let result = (await youtube.search(args.join(" ")))[0];
            // result = video
            if (result.type == "video"){
                let desc = result.description;
                video = await youtube.getVideoByID(result.id);
            
                embed.setTitle(video.title);
                embed.setURL(`https://www.youtube.com/watch?v=${video.id}`);
                embed.setDescription(desc);
                embed.setImage(video.thumbnails.medium.url);

            // result = channel
            } else if (result.type == "channel") {
                let channel = await youtube.getChannelByID(result.id);
                embed.setTitle(channel.title);
                embed.setURL(`https://www.youtube.com/channel/${channel.id}`);
                embed.setDescription(channel.description);
                embed.setThumbnail(channel.thumbnails.medium.url);
            } else {
                embed.description();
            }
        }

        return message.reply(embed);
    }
}