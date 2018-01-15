const {
  Command
} = require('discord-akairo');
var util = require("../helpers/util");

function getMString(id, mems) {
  return {
    amount: mems.filter(
        (m) => m.roles.has(id))
      .size,
    online: mems.filter(
        (m) => m.roles.has(id) && m.presence.status === "online")
      .size
  }
}
class ClansCommand extends Command {
  constructor() {
    super('clandesc', {
      aliases: ['clandesc'],
      split: "none",
      args: [{
        id: "desc"
      }]
    });
  }
  async exec(message, args) {
    if (!message.member.roles.has("334988662850846720")) {
      message.channel.send(new util.d.RichEmbed()
        .setColor(0xfd5c5c)
        .setTitle(":octagonal_sign: I cannot let you do that.")
        .setDescription("You are not a clan leader")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
    var clans = await global.mongo.collection("clans")
      .find({})
      .toArray();
    var memberclan = null;
    clans.map((clan) => {
      if (message.member.roles.has(clan.role)) memberclan = clan;
    })
    if (!memberclan) {
      return message.channel.send(new util.d.RichEmbed()
        .setColor(0xfd5c5c)
        .setTitle(":octagonal_sign: I cannot do that.")
        .setDescription("You do not have a clan role")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
    global.mongo.collection("clans")
      .updateOne({
        name: memberclan.name
      }, {
        $set: {
          desc: args.desc
        }
      });
    message.channel.send(new util.d.RichEmbed()
      .setTitle(":white_check_mark: Updated description")
      .setColor(0x49bd1a)
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
  }
}
module.exports = ClansCommand;
