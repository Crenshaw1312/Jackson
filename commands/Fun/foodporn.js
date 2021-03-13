const { MessageEmbed } = require("discord.js");
const { getRedditPost } = require("../../config/funcs.js");

module.exports = {
    name: "foodporn",
    description: "Gets a random picture of food porn from reddit",
    usage: "foodporn",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["fp"],
    run: async (client, message, args) => {
        let post = await getRedditPost(["FoodPorn"]);
        if (!post) return client.err(message, "Food Porn", "No food porn was returned");
    
        const embed = new MessageEmbed()
        .setTitle(`${post.title}`)
        .setURL(`https://reddit.com${post.permalink}`)
        .setColor(0x4B0082)
        .setImage(post.url)
        .setFooter(`👍 ${post.ups} 💬 ${post.num_comments} - ${post.subreddit_name_prefixed}`);

        return message.reply(embed);
    }
}