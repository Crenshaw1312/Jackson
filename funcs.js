const database = require("quick.db");

// choose, if in args use args
exports.choose = function choose(args, options, not) {
    let choice = options[Math.floor(Math.random() * options.length)];
    if (!args) return choice;
    for (let option of options) {
        if (args.find(arg => option == arg && not !== arg)) choice = option;
    }
    return choice;
}

// add user to guild database with starting jelly beans of 0
exports.createAccount = async function createAccount(message) {
    let user = message.mentions.users.first() || message.author;
    await database.set(`${message.guild.id}.${user.id}`, {"jellybeans": 0});
    return await database.get(`${message.guild.id}.${user.id}`);
}