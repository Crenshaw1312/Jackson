const { MessageEmbed } = require("discord.js");
const { getRedditPost } = require("../../config/funcs.js");

module.exports = {
    name: "showerthought",
    description: "Gets a random joke from reddit",
    usage: "showerthought",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["st"],
    run: async (client, message, args) => {
        let post = await getRedditPost(["Showerthoughts"]);
        if (!post) return client.err(message, "Shower Thought", "No shower thought was returned");

        const embed = new MessageEmbed()
        .setTitle(post.title)
        .setURL(`https://reddit.com${post.permalink}`)
        .setColor(0x4B0082)
        .setDescription(`${post.selftext}`)
        .setFooter(`👍 ${post.ups} - ${post.subreddit_name_prefixed}`);
    
        return message.reply(embed);
    }
}