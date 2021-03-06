const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mute any given user",
    usage: "mute <@user> [duration]",
    groups: ["moderation"],
    DM: false,
    cooldown: {type: "map", time: 0},
    aliases: ["silence"],
    run: async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.err(message, "Mute", 'You do not have permissons to mute');

        let target = message.mentions.members;
        let clientMember = await message.guild.members.fetch(client.user.id)
        if (!target.first()) return client.err(message, "Mute", "Please provide a user to mute");
        target = target.first();

        // finding the mute role
        let muteRole = message.guild.roles.cache.find(role => role.name === 'muted'||role.name === 'mute');
        // make a mute role if there is none
        if (!muteRole) {
            // Create a new role with data and a reason
            await message.guild.roles.create({
                data: {
                    name: 'mute',
                    color: 'RED',
                    position: clientMember.roles.highest.rawPosition - 1,
                    permissions: []
                },
                reason: 'No mute role found, so one was created',
            })
            .then(role => muteRole = role[1])
        }

        // give the mute role to the specified user
        if (clientMember.roles.highest.rawPosition < message.mentions.members.first().roles.highest.rawPosition) return client.err(message, "Mute", "This user's highest role is higher then mine, I cannot mute them.");
        
        target.roles.remove(target.roles.cache);
        target.roles.add(muteRole);

        const embed = new MessageEmbed()
        .setColor(0x4B0082)
        .setTitle("Mute")
        .setDescription(`Muted ${target.user.username}`);
        message.reply(embed);
        
    }
}