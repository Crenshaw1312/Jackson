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
        .setColor(0x4B0082);

        let link = await client.generateInvite({
            permissions: [
              Permissions.FLAGS.ADMINISTRATOR,
            ]
          });
        
        embed.setDescription(`Generated bot invite link: [Link](${link})`);
        message.reply(embed);
    }
}