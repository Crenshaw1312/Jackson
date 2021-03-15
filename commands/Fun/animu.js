const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const { choose } = require('../../config/funcs.js');


module.exports = {
    name: "animu",
    description: "Gives a random truth",
    usage: "animu [hug|pat|wink|face-palm]",
    groups: ["fun"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["ani"],
    run: async (client, message, args) => {

        // setting rating
        let animu = await choose(args, ["hug", "pat", "wink", "face-palm"], null);

        let gif = (await fetch(`https://some-random-api.ml/animu/${animu}`).then(response => response.json())).link;

        if (!gif)return client.err(message, "Animu", "No animu was returned, try again or get support");

        const embed = new MessageEmbed()
        .setTitle(`Animu - ${animu}`)
        .setColor(0x4B0082)
        .setImage(gif);
        return message.reply(embed);
    }
}