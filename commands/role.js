const {
  Command
} = require('discord-akairo');
var util = require("../helpers/util");
class SrCommand extends Command {
  constructor() {
    super('role', {
      aliases: ['role'],
      args: [{
        id: "op",
        type: "string"
      }, {
        id: "recip",
        type: "member"
      }, {
        id: "sr",
        type: "role",
        match: "rest"
      }]
    });
  }
  async exec(message, args) {
    if (args.op === "give") {
      var possible = await global.mongo.collection("sharableroles")
        .findOne({
          role: args.sr.id,
          owner: message.author.id
        });
      if (!possible) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I could not do that")
        .setColor(0xfd5c5c)
        .setDescription("That is not a sharable role, or it is not owned by you")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
        //"Already sharable by <@" + possible.owner + ">"
      )
      if (!args.recip) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I could not do that")
        .setColor(0xfd5c5c)
        .setDescription("I cannot find that member. Check you are using the command correctly: `!role give @Them#0000 Your Role`")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
        //"Already sharable by <@" + possible.owner + ">"
      )
      args.recip.addRole(args.sr, "Given by owner")
      //var fing = await global.mongo.collection("sharableroles").find({}).toArray();
      message.channel.send(new util.d.RichEmbed()
        .setTitle(":white_check_mark: Role " + args.sr.name + " given")
        .setColor(0x49bd1a)
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
    if (args.op === "take") {
      var possible = await global.mongo.collection("sharableroles")
        .findOne({
          role: args.sr.id,
          owner: message.author.id
        });
      if (!possible) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I could not do that")
        .setColor(0xfd5c5c)
        .setDescription("That is not a sharable role, or it is not owned by you")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
        //"Already sharable by <@" + possible.owner + ">"
      )
      if (!args.recip) return message.channel.send(new util.d.RichEmbed()
        .setTitle(":octagonal_sign: I could not do that")
        .setColor(0xfd5c5c)
        .setDescription("I cannot find that member. Check you are using the command correctly: `!role give @Them#0000 Your Role`")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
        //"Already sharable by <@" + possible.owner + ">"
      )
      args.recip.removeRole(args.sr, "Given by owner")
      //var fing = await global.mongo.collection("sharableroles").find({}).toArray();
      message.channel.send(new util.d.RichEmbed()
        .setTitle(":white_check_mark: Role " + args.sr.name + " taken")
        .setColor(0x49bd1a)
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
  }
}
module.exports = SrCommand;
