const database = require("quick.db");
const got = require('got');
const config = require('../config/config.js');

// choose, if in args use args
exports.choose = async (args, options, not) => {
    let choice = options[Math.floor(Math.random() * options.length)];
    if (!args)
        return choice;
    for (let option of options) {
        if (args.find(arg => option == arg && not !== arg))
            choice = option;
    }
    return choice;
}

// add user to guild database with starting jelly beans of 0
exports.createAccount = async (message) => {
    let user = message.mentions.users.first() || message.author;
    await database.set(`${message.guild.id}.${user.id}`, {"jellybeans": 0});
    return await database.get(`${message.guild.id}.${user.id}`);
}

// get last X messages
exports.fetchMessages = async function (channel, amount) {
    let messagesFormatted = "";
    await channel.messages.fetch({ limit: amount }).then(messages => {
        messagesFormatted = Array.from(messages.values());
    });
    return messagesFormatted;
}

// Reddit
exports.getRedditPost = async (subReddits) => {
    try {
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        let res = "";
        let response = await got(`https://www.reddit.com/r/${random}/random/.json`)
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;
        return post.data
    } catch (error) {
        return
    }
}
