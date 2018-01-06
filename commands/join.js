const { Command } = require('discord-akairo');
var util = require("../helpers/util");

class JoinCommand extends Command {
    constructor() {
        super('join', {
           aliases: ['join'],
           //cooldown: 2 * 60 * 60 * 1000,
           //ratelimit: 1,
           args: [
             {
               id: "clan",
               type: "string"
             }
           ]
        });
    }

    async exec(message, args) {
      var locked = true;
      if (locked && !message.member.roles.some(r => r.name === "Clanless")) return message.channel.send(new util.d.RichEmbed().setTitle(":octagonal_sign: I cannot let you do that"));
      var item = await global.mongo.collection("clans").findOne({name: args.clan.toLowerCase()});
      if (item == null) return message.channel.send(new util.d.RichEmbed().setTitle("Clan not found").setColor(util.red));
      var clans = await global.mongo.collection("clans").find({}).toArray();
      clans.map(c => {
        message.member.removeRole(message.guild.roles.get(c.role))
      })
      await message.channel.send(new util.d.RichEmbed()
      .setTitle(":white_check_mark: You joined " + item.displayName)
      .setColor(parseInt(item.color, 16))
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
      )
      message.member.addRole(message.guild.roles.get(item.role))
      message.member.removeRole("320199117467025418")
    }
}

module.exports = JoinCommand;
