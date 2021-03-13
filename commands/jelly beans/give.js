const { MessageEmbed, Guild } = require("discord.js");
const databse = require("quick.db");
const { createAccount } = require('../../funcs.js');
const config = require("../../config/config.js");

module.exports = {
    name: "jellybeangive",
    description: "Give somone some jellybeans",
    usage: "jellybeangive <@user> [amount]",
    groups: ["jellybean"],
    DM: false,
    cooldown: {type: "map", time: config.delayGive},
    aliases: ["jbg", "jbgive"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);
        const user = message.mentions.users.first();
        const maxGive = client.jellybean.maxgive
        // errors
        if (!user ) return client.err(message, "Jelly Bean Give", "Provide a user to give jelly bean(s) to");
        if (user == message.author) return client.err(message, "Jelly Bean Give", "You cannot give yourself jellybeans");

        let amount = (args[1] || "1");
        amount = Number(amount.match(/^[0-9]+$/gm));
        if (amount > maxGive || amount < 0) return client.err(message, "Jelly Bean Give", `Jelly bean give amount must be between 0 and ${maxGive}`);
        

        // set up and get database information
        let guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)
        if (!guildUserAccount) guildUserAccount = await createAccount(message);

        // add the jelly bean(s)
        databse.add(`${message.guild.id}.${user.id}.jellybeans`, amount)
        guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)

        embed.setTitle(`Jelly Bean Give`);
        embed.setDescription(`Gave ${user.username} \`${amount}\` jelly bean(s)\n${user.username} now has \`${guildUserAccount.jellybeans}\` jelly bean(s)`);
        return message.reply(embed);
        
    }
}