const Discord = require("discord.js");

module.exports = {
    name: "clear",
    category: "moderation",
    descripption: "Clear",
    run: async (client, message, args) => {
        message.delete();

        if(!message.member.hasPermission("MANAGE_MESSAGE")) return message.reply("oof.");
        if(!args[0]) return message.channel.send("oof");
        message.channel.bulkDelete(args[0]).then(() =>{
            message.channel.send(`Очищено ${args[0]} сообщений`).then(msg => msg.delete(5000));
            });
    }
}
