const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
const util_ = require('util');
const exec = util_.promisify(require('child_process')
  .exec);
class SayCommand extends Command {
  constructor() {
    super('grestart', {
      aliases: ['grestart', "grs"],
      ownerOnly: true
    });
  }
  async exec(message) {
    //util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var {
      stdout,
      stderr
    } = await exec("git pull");
    message.channel.send("```\nGit output:\n" + stdout + "```");
    message.channel.send(new Discord.RichEmbed()
      .setDescription(":alarm_clock: Pulled, restarting now. Brb")
      .setColor(0xFFFF00));
    exec("pm2 restart Sunset");
    return;
  }
}
module.exports = SayCommand;
