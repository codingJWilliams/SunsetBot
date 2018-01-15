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
    super('clans', {
      aliases: ['clans'],
      args: [{
        id: "page",
        type: "number",
        default: 1
      }]
    });
  }
  async exec(message, args) {
    var clans = await global.mongo.collection("clans")
      .find({})
      .toArray();
    clans = clans.sort((a, b) => {
      var a1 = getMString(a.role, message.guild.members)
        .amount;
      var b1 = getMString(b.role, message.guild.members)
        .amount
      if (a1 > b1) return -1;
      if (a1 === b1) return 0;
      return 1
    })
    var extra = [];
    var emb = new util.d.RichEmbed()
      .setTitle(":book: All Clans")
      .setDescription("Use `!clan <clan name>` for a longer description and a list of clan owners.")
      .setColor(0x0a96de)
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
    clans.map(
      (clan, i) => emb.addField(clan.displayName, `Owners: ${util.makePeopleList(clan.owners)}\n${getMString(clan.role, message.guild.members).amount} members.\n  ${clan.desc}`))
    message.channel.send(emb)
  }
}
module.exports = ClansCommand;
