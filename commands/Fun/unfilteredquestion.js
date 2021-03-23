const { MessageEmbed } = require("discord.js");
const { readFileSync } = require("fs");
const { choose } = require('../../config/funcs.js');

module.exports = {
    name: "unfilteredquestion",
    description: "gets an unfiltered question fromt he Truth Or Dare bot by WaterNinja101#2093",
    usage: "unfilteredquestion [wyr/dare/truth/nhie]",
    groups: ["fun"],
    DM: true,
    cooldown: {type: "map", time: 5},
    aliases: ["unq", "unfilt"],
    run: async (client, message, args) => {

        let rating = await choose(args, ["truth", "dare", "wyr", "nhie"], null);

        let questions;
        await readFile("C:\\Users\\HP\\Desktop\\Discord Bots\\ToD_BOT\\Questions\\questions")
        .then(data => JSON.parse(data))
        .then(data => questions = data)
        questions = questions.filter(question => question.rating = rating);
        
        const embed = new MessageEmbed()
        .setTitle("Unfiltered Question")
        .setColor(0x4B0082)
        .setDescription(questions[0].Question);

        return message.reply(embed);
    }
}