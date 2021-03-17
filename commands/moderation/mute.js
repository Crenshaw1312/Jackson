const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mute any given user",
    usage: "mute <@user> [duration]",
    groups: ["moderation"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["silence"],
    run: async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return client.err(message, "Mute", 'You do not have permissons to mute');

        let target = message.mentions.members;
        let clientMember = await message.guild.members.fetch(client.user.id)
        if (!target) return client.err(message, "Mute", "Please provide a user to mute");
        target = target.first();

        // finding the mute role
       let roleCache = await message.guild.roles.fetch()
        .then(roles => roles.cache);
        let muteRole = false;
        for (let role of roleCache) {
            if (role[1].name == "mute" || role[1].name == "muted") muteRole = role[1];
        }
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
        
    }
}