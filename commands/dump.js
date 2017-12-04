const { Command } = require('discord-akairo');
var util = require("../helpers/util");
var phonetic = require("phonetic");

class DumpCommand extends Command {
    constructor() {
        super('dump', {
           aliases: ['dump'],
           args: [
             {
               id: "vc",
               type: "voiceChannel",
               match: "rest"
             }
           ]
        });
    }

    async exec(message, args) {
      var members = [];
      var dumpid = phonetic.generate().toLowerCase();

      args.vc.members.map(m => members.push(m));
      var emb = new util.d.RichEmbed()
      .setTitle(":book: Members Currently In " + args.vc.name)
      .setDescription("```" + members.map(m => `<@${m.id}> (${m.user.tag})`).join("\n") + "```")
      .setColor(0x0a96de)
      .addField("Auto-Award", "The dump ID is: `" + dumpid + "`.\nDons: Type `!dumpaward " + dumpid + " 10000` to award all members")
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL);
      message.channel.send(emb)
      global.mongo.collection("dumps").insertOne({
        by: message.author.id,
        vc: args.vc.id,
        vcname: args.vc.name,
        time: Date.now(),
        id: dumpid,
        people: members.map(m => m.id)
      })
    }
}

module.exports = DumpCommand;