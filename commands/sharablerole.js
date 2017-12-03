const { Command } = require('discord-akairo');
var util = require("../helpers/util");

class SrCommand extends Command {
    constructor() {
        super('sharablerole', {
           aliases: ['sharablerole'],
           args: [
             {
               id: "op",
               type: "string"
             }, 
             {
               id: "owner",
               type: "member"
             },
             {
               id: "sr",
               type: "role"
             }
           ]
        });
    }

    async exec(message, args) {
      if (!message.member.roles.has("378906283727781888")) return message.channel.send(
        new util.d.RichEmbed()
        .setTitle(":octagonal_sign: Stop right there!")
        .setDescription("You must be `Staff` to use this command")
        .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
      );
      
      var possible = await global.mongo.collection("sharableroles").findOne({role: args.sr.id});
      if (possible) return message.reply("Already sharable by <@" + possible.owner + ">")
      await global.mongo.collection("sharableroles").insertOne({
        role: args.sr.id,
        owner: args.owner.id
      })
      var fing = await global.mongo.collection("sharableroles").find({}).toArray();
      message.channel.send(new util.d.RichEmbed().setTitle(":white_check_mark: Role " + args.sr.name + " marked as sharable").setColor(0x49bd1a).setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
}

module.exports = SrCommand;