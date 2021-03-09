const { MessageEmbed, Permissions } = require("discord.js");
const { inspect } = require('util');

module.exports = {
    name: "invite",
    description: "Evaluate entered code",
    usage: "invite",
    groups: ["owner"],
    aliases: ["inv"],
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Invite')
        .setDescription("Check console for invite link")
        .setColor(0x4B0082);

        client.generateInvite({
            permissions: [
              Permissions.FLAGS.SEND_MESSAGES,
              Permissions.FLAGS.BAN_MEMBERS,
              Permissions.FLAGS.PRIORITY_SPEAKER,
            ],
          })
            .then(link => console.log(`Generated bot invite link: ${link}`));
        
        message.reply(embed);
    }
}