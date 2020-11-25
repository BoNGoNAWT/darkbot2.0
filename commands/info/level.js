const leveling = require("discord-leveling");
const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    name: "rank",
    category: "info",
    descripption: "Your level",
    run: async (client, message, args) => {

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        let output = await leveling.Fetch(user.id);

        var rank = new MessageEmbed()
        .setColor("#AA0A50")
        .setTimestamp()
        .setDescription(user)
        .setFooter(user.username, user.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .addField('LVL: ', output.level)
        .addField('XP:', output.xp)
        message.channel.send(rank);
    }
}