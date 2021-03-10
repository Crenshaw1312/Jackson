const { MessageEmbed, Guild } = require("discord.js");
const databse = require("quick.db");
const funcs = require('../../funcs.js');

module.exports = {
    name: "jellybeanset",
    description: "Set somone some jellybeans",
    usage: "jellybeanset <@user> <amount>",
    groups: ["jellybean"],
    DM: false,
    aliases: ["jbset", "jellybeanreset", "jbreset"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);
        const user = message.mentions.users.first();
        // errors
        if (!message.member.permissions.has('MANAGE_GUILD') || !message.member.permissions.has('ADMINISTRATOR')) return client.err(message, "Jelly Bean Set", 'You do not have permissons to set jelly beans');
        if (!user ) return client.err(message, "Jelly Bean Set", "Provide a user change their jelly bean amount");

        // get the amount, otherwise just reset
        let amount = (args[1] || "0");
        amount = Number(amount.match(/^[0-9]+$/gm));
        

        // set up and get database information
        let guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)
        if (!guildUserAccount) guildUserAccount = await funcs.createAccount(message);

        // add the jelly bean(s), this now makes guildUserAccount in this instance their OLD count, which we use later
        databse.set(`${message.guild.id}.${user.id}.jellybeans`, amount)

        embed.setTitle(`Jelly Bean Set`);
        embed.setDescription(`Set the jelly bean ammount of ${user.username} to \`${amount}\` jelly bean(s)\n${user.username} had \`${guildUserAccount.jellybeans}\` jelly bean(s)`);
        return message.reply(embed);
        
    }
}