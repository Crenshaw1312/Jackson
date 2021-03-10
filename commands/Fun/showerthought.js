const { MessageEmbed } = require("discord.js");
const got = require('got');

module.exports = {
    name: "showerthought",
    description: "Gets a random joke from reddit",
    usage: "showerthought",
    groups: ["fun"],
    aliases: ["st"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed();
        got(`https://www.reddit.com/r/Showerthoughts/random/.json`)
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const stUrl = `https://reddit.com${permalink}`;
    
                embed.setTitle(post.data.title);
                embed.setURL(`${stUrl}`);
                embed.setColor(0x4B0082);
                embed.setDescription(`||${post.data.selftext}||`);
                embed.setFooter(`👍 ${post.data.ups} - ${post.data.subreddit_name_prefixed}`);
    
                return message.reply(embed);
            });
    }
}