const {
  Command
} = require('discord-akairo');
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
      var item = await global.mongo.collection("clans").findOne({name: args.clan.toLowerCase()});
      if (item == null) return message.channel.send(new util.d.RichEmbed().setTitle("Clan not found").setColor(util.red));
      var locked = true;
      var clans = await global.mongo.collection("clans").find({}).toArray();
      for (var i =0; i<clans.length; i++){
        var c = clans[i];
        await message.member.removeRole(message.guild.roles.get(c.role))
      }
    await ((ms)=>new Promise((resolve,rej) => setTimeout(resolve,ms)))()
      await message.channel.send(new util.d.RichEmbed()
      .setTitle(":white_check_mark: You joined " + item.displayName)
      .setColor(parseInt(item.color, 16))
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    await message.member.addRole(message.guild.roles.get(item.role))
    await message.member.removeRole("437213205782069259")
  }
}
module.exports = JoinCommand;
