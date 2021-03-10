const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Get the avatar of the triggering user or mentioned user",
    usage: "avatar [mention]",
    groups: ["information", "fun"],
    DM: false,
    aliases: ["who", "whois"],
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;

        // set up inital embed
        const embed = new MessageEmbed()
            .setColor(0x4B0082)
            .setTitle(`Userinfo - ${user.username}\#${user.discriminator}`)
            .setFooter(`Ran by: ${message.author.username}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}));

        // get roles
        let roles = "";
        for (let role of member._roles) {
            roles += `<@&${role}>, `
        }

        // get status
        let status = user.presence.status;
        
        // get presence
        let presences = "";
        for (let presence of user.presence.activities) {
            if (presence.type !== "CUSTOM_STATUS") {
                presences += `${presence.type.toLowerCase()} ${presence.name}\n${presence.state}\n\n`;
            } else if (presence.state) {
                presences += `custom__status: ${presence.state}\n\n`
            }
        }

        // add fields
        embed.addFields([
            {name: "Status", value: status, inline: true},
            {name: "ID", value: `\`${user.id}\``, inline: true},
        ]);
        if (member.nickname) {
            embed.addField("Nickname", member.nickname, true);
        }
        embed.addFields([
            {name: "Roles", value: roles, inline: false},
            {name: "Presences", value: presences, inline: false}
        ]);
        return message.reply(embed);
    }
}