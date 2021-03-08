const { MessageEmbed } = require("discord.js");
const got = require('got');

module.exports = {
    name: "joke",
    description: "Gets a random joke from reddit",
    usage: "joke",
    groups: ["fun"],
    aliases: ["j"],
    run: async (client, message, args) => {
        const subReddits = ["jokes", "dadjokes", "antijokes", "meanjokes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const embed = new MessageEmbed();
        got(`https://www.reddit.com/r/${random}/random/.json`)
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const jokeUrl = `https://reddit.com${permalink}`;
    
                embed.setTitle(post.data.title);
                embed.setURL(`${jokeUrl}`);
                embed.setColor(0x4B0082);
                embed.setDescription(`||${post.data.selftext}||`);
                embed.setFooter(`👍 ${post.data.ups} - ${post.data.subreddit_name_prefixed}`);
    
                return message.reply(embed);
            });
    }
}