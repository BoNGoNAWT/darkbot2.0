const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "warn",
    category: "moderation",
    descripption: "Warn",
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

        if (!member) return msg.reply('They aren in the server');

        var reason = args.splice(1).join(' ');
        if(!reason) return msg.reply('Укажите причину!');

        var channel = msg.guild.channels.cache.find(c => c.name === "logs");

        var log = new MessageEmbed()
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter(msg.author, msg.author.displayAvatarURL())
        .setThumbnail(user.displayAvatarURL())
        .setTitle('User Warned')
        .addField('Предупрежден:', user, true)
        .addField('Причина:', reason)
        channel.send(log);

        var emb = new MessageEmbed()
        .setColor("#ff0000")
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setDescription("Предупреждение")
        .addField("Нарушитель:", user, true)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        msg.channel.send(emb);

        var embed = new MessageEmbed()
        .setColor("#ff0000")
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .setDescription("Предупреждение")
        .addField("Причина:", reason, true)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        user.msg.send(emded);
    }
}