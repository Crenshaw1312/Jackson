const { MessageEmbed } = require("discord.js");
const got = require('got');

module.exports = {
    name: "meme",
    description: "Gets a random meme from reddit",
    usage: "meme",
    groups: ["fun"],
    aliases: ["m"],
    run: async (client, message, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const embed = new MessageEmbed();
        got(`https://www.reddit.com/r/${random}/random/.json`)
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;
    
                const permalink = post.data.permalink;
                const Url = `https://reddit.com${permalink}`;
    
                embed.setTitle(`${post.data.title}`);
                embed.setURL(`${Url}`);
                embed.setColor(0x4B0082);
                embed.setImage(post.data.url);
                embed.setFooter(`👍 ${post.data.ups} 💬 ${post.data.num_comments} - ${post.data.subreddit_name_prefixed}`);
    
                return message.reply(embed);
            });
    }
}