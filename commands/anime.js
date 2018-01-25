const {
  Command
} = require('discord-akairo');
var util = require("../helpers/util");

function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
class ClansCommand extends Command {
  constructor() {
    super('test', {
      aliases: ['test'],
      split: "none"
    });
  }
  async exec(message, args) {
    var cloud = ":cloud:";
    var terrorist = ":man_with_turban::skin-tone-5:";
    var arrow = ":arrow_right:";
    var takingoff = ":airplane_departure:";
    var plane = ":plane:"
    var towers = ":pause_button:";
    var fire = ":fire:";
    var nine_eleven = "9/11 :thumbs_up:";
    var deploy = "Deploying terrorism to Nightborn..."
    var animation = [
      [terrorist, arrow, takingoff],
      [takingoff, cloud, cloud, cloud]
      [cloud, plane, cloud, cloud],
      [cloud, cloud, plane, cloud],
      [plane, cloud, cloud, towers],
      [cloud, plane, cloud, towers],
      [cloud, cloud, plane, towers],
      [cloud, fire, towers, fire],
      [nine_eleven],
      [deploy]
    ];
    var m = await message.channel.send(animation[1].join(" "));
    for (var i = 1; i < animation.length; i++) {
      await timeout(800);
      m.edit(animation[i].join(" "))
    }
  }
}
module.exports = ClansCommand;
