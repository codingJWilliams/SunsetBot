const { Command } = require('discord-akairo');
var util = require("../helpers/util");
var pagination = require("../helpers/pagination");

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
        super('clans', {
           aliases: ['clans']
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
      var chunks = pagination.chunk(clans)
      var mes = await message.channel.send(":alarm_clock: ");
      
      var currentPage = 1;
      await pagination.showPage(1, mes);
      const collector = mes.createReactionCollector(
        (reaction, user) => user.id === message.author.id,
        { time: 150000 }
      );
      collector.on('collect', r => {
        console.log(currentPage)
        if (r.emoji.name === "⬅") return pagination.showPage(currentPage === 1 ? 1 : --currentPage, mes, chunks);
        if (r.emoji.name == "➡" && currentPage < chunks) { currentPage++; return pagination.showPage(currentPage, mes, chunks.length) }
        if (r.emoji.name === "🗑") return mes.delete()
        pagination.showPage(currentPage, mes, chunks)
      });
    }
}

module.exports = ClansCommand;