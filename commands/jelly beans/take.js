const { MessageEmbed, Guild } = require("discord.js");
const databse = require("quick.db");
const funcs = require('../../funcs.js');

module.exports = {
    name: "jellybeantake",
    description: "Take some jellybeans",
    usage: "jellybeantake <@user> [amount]",
    groups: ["jellybean"],
    DM: false,
    aliases: ["jbt", "jbtake"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);
        const user = message.mentions.users.first();
        const maxTake = client.jellybean.maxTake
        // errors
        if (!user ) return client.err(message, "Jelly Bean Take", "Provide a user to take jelly bean(s) to");
        if (user == message.author) return client.err(message, "Jelly Bean Take", "You cannot take yourself jellybeans");

        let amount = (args[1] || "1");
        amount = Number(amount.match(/^[0-9]+$/gm));
        if (amount > maxTake || amount < 0) return client.err(message, "Jelly Bean Take", `Jelly bean take amount must be between 0 and ${maxTake}`);
        

        // set up and get database information
        let guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)
        if (!guildUserAccount) guildUserAccount = await createAccount(message);

        // add the jelly bean(s)
        databse.subtract(`${message.guild.id}.${user.id}.jellybeans`, amount)
        guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)

        embed.setTitle(`Jelly Bean Take`);
        embed.setDescription(`Took \`${amount}\` jelly bean(s) from ${user.username}\n${user.username} now has \`${guildUserAccount.jellybeans}\` jelly bean(s)`);
        return message.reply(embed);
        
    }
}