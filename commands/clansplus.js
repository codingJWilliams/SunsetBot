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
        super('clansplus', {
           aliases: ['clansplus']
        });
    }

    async exec(message, args) {
      var clans = await global.mongo.collection("clans").find({}).toArray();
      clans = clans.sort( (a, b) => {
        var a1 = getMString(a.role, message.guild.members).amount;
        var b1 = getMString(b.role, message.guild.members).amount
        if (a1 > b1) return -1;
        if (a1 === b1) return 0;
        return 1
      })
      var i,j,temparray,chunk = 2;
      var chunks = [];
      var myarr = clans
      for (i=0,j=myarr.length; i<j; i+=chunk) {
        temparray = myarr.slice(i,i+chunk);
        chunks.push(temparray)
      };
      var mes = await message.channel.send(":alarm_clock: ");
      function showPage(pg, msg, tot) {
        var ind = pg - 1;
        var chs = chunks[ind];
        makePage(makeEmbed(chs, message, pg, tot), msg);
      }
      var currentPage = 1;
      await showPage(1, mes);
      const collector = mes.createReactionCollector(
        (reaction, user) => user.id === message.author.id,
        { time: 150000 }
      );
      console.log(chunks)
      collector.on('collect', r => {
        console.log(currentPage)
        if (r.emoji.name === "⬅") return showPage(currentPage === 1 ? 1 : --currentPage, mes, chunks.length);
        if (r.emoji.name == "➡" && currentPage <= chunks.length) { currentPage++; return showPage(currentPage, mes, chunks.length) }
        if (r.emoji.name === "🗑") return mes.delete()
      });
    }
}
async function makePage(emb, m) {
  var m = await m.edit(emb);
  await m.clearReactions();
  await m.react("⬅");
  await m.react("➡");
  await m.react("🗑");
  return m
}
function makeEmbed(chunks, message) {
  var extra = [];
  var emb = new util.d.RichEmbed()
  .setTitle(":book: All Clans")
  .setDescription("Use `!clan <clan name>` for a longer description and a list of clan owners.")
  .setColor(0x0a96de)
  .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
  chunks.map(
    (clan) => 
      emb.addField(clan.displayName, `Owners: ${util.makePeopleList(clan.owners)}\n${getMString(clan.role, message.guild.members).amount} members.\n  ${clan.desc}`)
  )
  return emb
}
module.exports = ClansCommand;