const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Evaluate entered code",
    usage: "invite",
    groups: ["owner"],
    DM: true,
    cooldown: {type: "map", time: 0},
    aliases: ["inv"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Invite')
        .setDescription("Check console for invite link")
        .setColor(0x4B0082);

        client.generateInvite({
            permissions: [
              Permissions.FLAGS.ADMINISTRATOR,
            ]
          })
            .then(link => console.log(`Generated bot invite link: ${link}`));
        
        message.reply(embed);
    }
}