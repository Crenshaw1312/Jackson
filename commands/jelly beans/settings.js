const { MessageEmbed, Guild } = require("discord.js");
const databse = require("quick.db");


module.exports = {
    name: "jellybeansettings",
    description: "View and manage jelly bean settings",
    usage: "jellybeansettings [maxgive|maxtake] <new ammount>",
    groups: ["jellybean"],
    DM: true,
    cooldown: {type: "map", time: 3},
    aliases: ["jbsets", "jbsettings"],
    run: async (client, message, args) => {
        let maxGive = client.jellybean.maxGive
        let maxTake = client.jellybean.maxTake
        const embed = new MessageEmbed()
        .setColor(0x4B0082);

        if (!args.length) {
            embed.setTitle("Jelly Bean Settings");
            embed.setDescription(`Max give: ${maxGive}\nMax take: ${maxTake}`);
            return message.reply(embed);
        }

        // require perms
        if (!message.member.permissions.has('MANAGE_GUILD') || !message.member.permissions.has('ADMINISTRATOR')) return client.err(message, "Jelly Bean Settings", 'You do not have permisson to change jelly bean settings');

        function num(args, max) {
            let amount = (args[1] || max);
            return Number(amount.match(/^[0-9]+$/gm));
        }

        if (args[0] == "maxgive") {
            databse.set(`${messge.guild.id}.jellybeandata.maxGive`, num(args, maxGive));
            embed.setDescription(`Set the maximum give amount to \`${num(args, maxGive)}\``);
        } else if (args[0] == "maxtake") {
            databse.set(`${message.guild.id}.jellybeandata.maxTake`, num(args, maxTake));
            embed.setDescription(`Set the maximum take amount to \`${num(args, maxTake)}\``);
        } else {
            return client.err(message, "Jelly Bean Settings", "Valid settings you can change are maxgive and maxtake");
        }

        return message.reply(embed);
    }
}