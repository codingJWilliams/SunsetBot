const {
  Command
} = require('discord-akairo');
var util = require("../helpers/util");
class SrCommand extends Command {
  constructor() {
    super('sharablerole', {
      aliases: ['sharablerole'],
      args: [{
        id: "op",
        type: "string"
      }, {
        id: "owner",
        type: "member"
      }, {
        id: "sr",
        type: "role",
        match: "rest"
      }]
    });
  }
  async exec(message, args) {
    if (!message.member.roles.has("433018096144482325")) return message.channel.send(new util.d.RichEmbed()
      .setTitle(":octagonal_sign: Stop right there!")
      .setDescription("You must be `Staff` to use this command")
      .setColor(0xfd5c5c)
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL));
    if (args.op === "add") {
      var possible = await global.mongo.collection("sharableroles")
        .findOne({
          role: args.sr.id
        });
      if (possible) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I could not do that")
        .setColor(0xfd5c5c)
        .setDescription("That is already a sharable role, owned by <@" + possible.owner + ">")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
        //"Already sharable by <@" + possible.owner + ">"
      )
      await global.mongo.collection("sharableroles")
        .insertOne({
          role: args.sr.id,
          owner: args.owner.id
        })
      var fing = await global.mongo.collection("sharableroles")
        .find({})
        .toArray();
      message.channel.send(new util.d.RichEmbed()
        .setTitle(":white_check_mark: Role " + args.sr.name + " marked as sharable")
        .setColor(0x49bd1a)
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    } else if (args.op === "remove") {
      var possible = await global.mongo.collection("sharableroles")
        .findOne({
          role: args.sr.id
        });
      if (!possible) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I cannot do that!")
        .setDescription("Either " + args.sr.name + " is not a sharable role, or the user mentioned is not the owner.")
        .setColor(0xfd5c5c)
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
      await global.mongo.collection("sharableroles")
        .findOneAndDelete({
          role: args.sr.id
        })
      message.channel.send(new util.d.RichEmbed()
        .setTitle(":white_check_mark: Role " + args.sr.name + " is no longer marked as sharable")
        .setColor(0x49bd1a)
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
  }
}
module.exports = SrCommand;
