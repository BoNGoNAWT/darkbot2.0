var { Discord, MessageEmbed } = require("discord.js");
var ms = require("ms");


module.exports = {
    name: "mute",
    aliaases: ["tm", "tmute"],
    category: "moderation",
    descripption: "Временный мут",
    run: async (client, msg, args) => {
        msg.delete();
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('вы не можете использовать данную команду!');

        var user = msg.mentions.users.first();
        if (!user) return msg.reply('Укажите тег');

        var member;

        try {
            member = await msg.guild.members.fetch(user);
        }catch(err){
            member = null;
        }

        if (!member) return msg.reply('Данного ползователя нет на сервере');
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('У данного пользователя имунитет!');

        var rawTime = args[1];
        var time = ms(rawTime);
        if (!time) return msg.reply('Укажите время');


        var reason = args.splice(2).join(' ');
        if(!reason) return msg.reply('Укажите причину!');

        var channel = msg.guild.channels.cache.find(c => c.name === "logs");

        var log = new MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(msg.author, msg.author.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setTitle('User Muted')
        .addField('Нарушитель:', user, true)
        .addField('Причина:', reason)
        .addField("Время:", ms(time), true)
        channel.send(log);


        var role = msg.guild.roles.cache.find(r => r.name === 'muted');

        member.roles.add(role);

        setTimeout(async() => {
            member.roles.remove(role);
        }, time);

        var emb = new MessageEmbed()
        .setColor("#ff0000")
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setDescription("Блокировка сообщений")
        .addField("Нарушитель:", user, true)
        .addField("Время:", ms(time), true)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        msg.channel.send(emb);
    }
}