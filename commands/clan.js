const { Command } = require('discord-akairo');
var util = require("../helpers/util");

class ClanCommand extends Command {
    constructor() {
        super('clan', {
           aliases: ['clan'],
           args: [
             {
               id: "clan",
               type: "clan"
             }
           ]
        });
    }

    async exec(message, args) {
      var size = message.guild.members.filter(
        (m) => 
          m.roles.has(args.clan.role)
      ).size;
      var online = message.guild.members.filter(
        (m) => 
          m.roles.has(args.clan.role) && m.presence.status === "online"
      ).size;
      
      message.channel.send(new util.d.RichEmbed()
      .setTitle(":book: Clan " + args.clan.displayName)
      .addField("Owners", util.makePeopleList(args.clan.owners))
      .addField("Description", args.clan.desc)
      .setColor(parseInt(args.clan.color, 16))
      .addField("Size", size + " members, " + online + " online")
      .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
      )
    }
}

module.exports = ClanCommand;