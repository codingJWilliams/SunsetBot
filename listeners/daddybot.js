const { Listener } = require('discord-akairo');
var eco = require("../helpers/economy");

class DaddyListener extends Listener {
    constructor() {
        super('daddylistener', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    async exec(msg) {
      if (!msg.author.bot) return;
      if (msg.author.id !== "159985870458322944") return;
      var regex = /.* just hit their \*\*level [0-9]+\*\* powerspike!/;
      if (!regex.test(msg.content)) return;
      console.log(msg.content)
      var level = parseInt(/level [0-9]+/.exec(msg.content)[0].split(" ")[1]);
      
      var person = /<@[0-9]+>/.exec(msg.content)[0];
      var id = person.replace("<@", "");
      id = id.replace(">", "");
      /*
      var reward = 0;
      if (level > 0) reward = 1000;
      if (level > 3) reward = 3000;
      if (level > 8) reward = 6000;
      if (level > 12) reward = 10000;
      if (level > 15) reward = 12000;
      if (level > 20) reward = 30000;
      if (level > 23) reward = 32000;
      if (level > 27) reward = 37000;
      if (level > 30) reward = 40000;
      if (level > 35) reward = 45000;
      if (level > 40) reward = 100000;
      if (level > 45) reward = 600000;
      if (level > 50) reward = 800000;
      if (level > 60) reward = 1000000;
      if (level > 80) reward = 4000000;
      if (level === 99) reward = 100000000;
      */
      var reward = require("../helpers/calculateRank")(level);

      msg.guild.members.get(id).addRole(reward.addrank);
      [
        "341143713625669632",
        "341143798832693248",
        "341143817552134154",
        "341143835604156428",
        "341143849646686211"
      ].filter(i => i !== reward.addrank).map(i => msg.guild.members.get(id).removeRole(i))
      if (reward.reward) {
        msg.channel.send("GG! You've been awarded " + reward.reward + " souls.")
      } else {
        msg.channel.send("GG!")
      }
      
      try { eco.award(id, reward.reward) }
      catch (e) {}
    }
}

module.exports = DaddyListener;