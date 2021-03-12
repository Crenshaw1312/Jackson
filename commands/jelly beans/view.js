const { MessageEmbed, Guild } = require("discord.js");
const databse = require("quick.db");
const { createAccount } = require('../../funcs.js');

module.exports = {
    name: "jellybeans",
    description: "View your own, or someone else's jellybean count",
    usage: "jellybeanview [@user]",
    groups: ["jellybean"],
    DM: false,
    cooldown: {type: "map", time: 3},
    aliases: ["jbv", "jbview", "jellybeanview", "jbs", "jbeans"],
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor(0x4B0082);
        const user = message.mentions.users.first() || message.author;

        // set up and get database information
        let guildUserAccount = await databse.get(`${message.guild.id}.${user.id}`)
        if (!guildUserAccount) guildUserAccount = await createAccount(message);

        embed.setTitle(`Jelly Beans: ${user.username}\#${user.discriminator}`);
        embed.setDescription(`This user has \`${guildUserAccount.jellybeans}\` jelly beans`);
        return message.reply(embed);
        
    }
}