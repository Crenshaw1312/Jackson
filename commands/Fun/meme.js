const { MessageEmbed } = require("discord.js");
const { getRedditPost } = require("../../config/funcs.js");

module.exports = {
    name: "meme",
    description: "Gets a random meme from reddit",
    usage: "meme",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 0},
    aliases: ["m"],
    run: async (client, message, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        let post = await getRedditPost(subReddits);
        if (!post) return client.err(message, "Meme", "No meme was returned");
  
        const embed = new MessageEmbed()
        .setTitle(`${post.title}`)
        .setURL(`https://reddit.com${post.permalink}`)
        .setColor(0x4B0082)
        .setImage(post.url_overridden_by_dest)
        .setFooter(`👍 ${post.ups} 💬 ${post.num_comments} - ${post.subreddit_name_prefixed}`);

        return message.reply(embed);
    }
}