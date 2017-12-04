const { Command } = require('discord-akairo');
var util = require("../helpers/util");

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
      args.vc.members.map(m => members.push(m));
      var emb = new util.d.RichEmbed()
      .setTitle(":book: Members Currently In " + args.vc.name)
      .setDescription("```" + members.map(m => `<@${m.id}> (${m.user.tag})`).join("\n") + "```")
      .setColor(0x0a96de)
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL);
      message.channel.send(emb)
    }
}

module.exports = DumpCommand;