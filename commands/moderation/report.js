const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { category } = require("../info/info");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Подать жалобу на пользователя",
    usage: "< mention | id>",
    run: async (client, message, args) => {
        if (message.daletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Невозможно найти данного пользователя").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBER") || rMember.user.bot)
            return message.reply("Невозможно подать жалобу на данного пользователя").then(m => m.delete(5000));

        const channel = message.guild.channels.find(channel => channel.name === "logs");

        if (!channel)
            return message.channel.send("Не могу найти канал для репортов").then(m => m.delete(5000));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Подан репорт", rMember.user.displayAwatarURL)
            .setDescription(stripIndents`**> Нарушитель:** ${rMember} ${rMember.id}
            **> Подал репорт:** ${message.member} ${message.member.id}
            **> Канал:** ${message.channel}
            **> Причина:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}