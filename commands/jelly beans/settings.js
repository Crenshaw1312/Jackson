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
        const jellyBeanData = client.config.jellybeans
        const embed = new MessageEmbed()
        .setTitle("Jelly Bean Settings")
        .setColor(0x4B0082);

        // require perms
        if (!message.member.permissions.has('MANAGE_GUILD') || !message.member.permissions.has('ADMINISTRATOR')) return client.err(message, "Jelly Bean Settings", 'You do not have permisson to change jelly bean settings');

        let sets = ["maxgive", "maxtake", "reset"];
        let set = sets.find(set => set == args[0]);

        if (!set) return client.err(message, "Jelly Bean Settings", `Valid settings you can change are:\n\`\`\`\n${sets.join("\n")}\n\`\`\``);

        if (args[0] == "reset") {
            await databse.delete(`${message.guild.id}.jellybeandata.${set}`);
            embed.setDescription("Reset all jelly bean data");
            return message.reply(embed)
        }

        let entry = (args[1] || jellyBeanData[set]);
        entry = Number(entry.match(/^[0-9]+$/igm));
        await databse.set(`${message.guild.id}.jellybeandata.${set}`, entry);

        embed.setDescription(`Set \`${set}\` to \`${entry}\``);
        return message.reply(embed);
    }
}