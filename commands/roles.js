const { Command } = require('discord-akairo');
var util = require("../helpers/util");

function getMString(id, mems) {
  return {
    amount: mems.filter(
      (m) => 
        m.roles.has(id)
    ).size,
    online: mems.filter(
      (m) => 
        m.roles.has(id) && m.presence.status === "online"
    ).size
  }
}


class ClansCommand extends Command {
    constructor() {
        super("roles", {
           aliases: ['roles'],
           args: [
             {
               id: "pg",
               type: "number",
               default: 1
             }
           ]
        });
    }

    async exec(message, args) {
      var roles = await global.mongo.collection("clans").find({}).toArray();
      var extra = [];
      var m = message.channel.send("Loading...")
      function displayPage(pg) {
        var consumable = roles.slice(0);
        var chunks = []
        while(consumable.length) {
          chunks.push(consumable.splice(0,16));
        }
        var current = chunks[pg + 1];
        var e = 
        new util.d.RichEmbed()
        .setTitle(":book: All Sharable Roles")
        .setDescription("This is a brief list of all the sharable roles on the server. Type `!roles 2` to see the next page. See a role you like? Be kind to the owner and maybe they'll give it to you!")
        .setColor(0x0a96de)
        .setFooter("Page " + (pg + 1) + " of " + chunks.length);
        var things = ""
        current.map( sr => {
          things = things + "<@&" + sr.role + "> - <@" + sr.owner + ">\n";
        })
        e.addBlankField()
        e.addField("Roles", things);
        m.edit(e)
        //m.clearReactions()
        //m.react("←").then( () => m.react("→"))
      }
      displayPage(args.pg);
      message.channel.send(emb)
    }
}

module.exports = ClansCommand;