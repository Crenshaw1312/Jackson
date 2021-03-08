const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Provides you some wisdom",
    usage: "8ball <question>",
    groups: ["fun"],
    aliases: ["8", "8b"],
    run: async (client, message, args) => {
        const options = ["It is certain", "Without a doubt", "You may rely on it", "Yes definitely", "It is decidedly so", "As I see it, yes", "Most likely", "Yes", "Outlook good", "Signs point to yes", "Reply hazy try again", "Better not tell you now", "Ask again later", "Cannot predict now", "Concentrate and ask again", "Don’t count on it", "Outlook not so good", "My sources say no", "Very doubtful", "My reply is no"];
        const random = options[Math.floor(Math.random() * options.length)];
        const embed = new MessageEmbed()
        .setTitle('8Ball')
        .setColor(0x4B0082);

        if (args.length){
            embed.setDescription(random);
        }
        else{
            embed.setDescription('Please provide a question.')
        }

        return message.reply(embed);
    }
}