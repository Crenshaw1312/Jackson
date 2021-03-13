const { MessageEmbed } = require("discord.js");
const { getRedditPost } = require("../../funcs.js");

module.exports = {
    name: "joke",
    description: "Gets a random joke from reddit",
    usage: "joke",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["j"],
    run: async (client, message, args) => {
        const subReddits = ["jokes", "dadjokes", "antijokes", "meanjokes"];
        let post = await getRedditPost(subReddits);
        if (!post) return client.err(message, "Joke", "No joke was returned");

        const embed = new MessageEmbed()
        .setTitle(post.title)
        .setURL(`https://reddit.com${post.permalink}`)
        .setColor(0x4B0082)
        .setDescription(`||${post.selftext}||`)
        .setFooter(`👍 ${post.ups} - ${post.subreddit_name_prefixed}`);
        message.reply(embed);
    }
}