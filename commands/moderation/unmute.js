const { MessageEmbed } = require("discord.js");
const mute = require("./mute");

module.exports = {
    name: "unmute",
    description: "Unmutes a specified muted user",
    usage: "unmute <@user>",
    groups: ["moderation"],
    DM: false,
    cooldown: {type: "map", time: 0},
    aliases: ["unsilence"],
    run: async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.err(message, "Unmute", 'You do not have permissons to unmute');

        let target = message.mentions.members;
        let clientMember = await message.guild.members.fetch(client.user.id)
        if (!target.first()) return client.err(message, "Unmute", "Please provide a user to unmute");
        target = target.first();

        // finding the mute role
       let muteRole = message.guild.roles.cache.find(role => role.name === 'muted'||role.name === 'mute');

       if (!muteRole) client.err(message, "Unmute", "No mute role was found, please make one with the name `mute` or `muted`.");
       
        isMuted = false;
        for (let role of target._roles) {
            if (muteRole.id == role) isMuted = true;
        }
        if (!isMuted) return client.err(message, "Unmute", "This user isn't muted");

        if (clientMember.roles.highest.rawPosition < message.mentions.members.first().roles.highest.rawPosition) return client.err(message, "Unmute", "The mute role is higher than my highest role");
        target.roles.remove(muteRole);

        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Unmute")
        .setDescription(`Unuted ${target.user.username}`);
        message.reply(embed);

    }
}