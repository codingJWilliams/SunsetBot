const {
  Command
} = require('discord-akairo');
const {
  Role,
  RichEmbed,
  Message,
  MessageReaction,
  User
} = require("discord.js");
var mongoLib = require("mongodb");
var {
  MongoClient,
  Db,
  ObjectId
} = mongoLib;
var util = require("../helpers/util");
function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
/**
 * @typedef {{ role: string, owner: string, _id: ObjectId }} SharableRole
 */
class JoinCommand extends Command {
  constructor() {
    super('nuke', {
      aliases: ['nuke'],
      userPermissions: ["ADMINISTRATOR"],
      args: [{
        id: "op",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
    if (!["sharableroles"].includes(args.op)) return;
    /**@type {Db} */
    var mongo = global.mongo;
    /**
     * @type {Message}
     */
    var m = await message.channel.send(
      new RichEmbed()
      .setColor(0x36393e)
      .setTitle("Fuck, u sure?")
      .setDescription("**React <:gasm:310821749467906048> to show that ur sure bro**")
      .setFooter("Or press :x: to not...")
    );
    await m.react(":gasm:310821749467906048");
    await m.react("❌");
    var coll = await m.awaitReactions(
      /**
       * @param {MessageReaction} reaction
       * @param {User} user
       */
      (reaction, user) => {
        return (reaction.emoji.id == "310821749467906048" || reaction.emoji.name == "❌") && user.id == message.author.id;
      }, {
        max: 1
      });
    if (coll.get("❌")) return message.reply("ok, cancelled. stay safe bro");
    await message.channel.send("Imagine that the " + args.op + " are the twin towers and mr turban guy is you")
    var cloud = ":cloud:";
    var terrorist = ":man_with_turban::skin-tone-5:";
    var arrow = ":arrow_right:";
    var takingoff = ":airplane_departure:";
    var plane = ":airplane:"
    var towers = ":city_sunset:";
    var fire = ":fire:";
    var nine_eleven = "9/11 :thumbsup:";
    var deploy = "Deploying terrorism to Nightborn..."
    var animation = [
      [terrorist, arrow, takingoff],
      [takingoff, cloud, cloud, cloud],
      [cloud, plane, cloud, cloud],
      [cloud, cloud, plane, cloud],
      [plane, cloud, cloud, towers],
      [cloud, plane, cloud, towers],
      [cloud, cloud, plane, towers],
      [cloud, fire, towers, fire],
      [nine_eleven]
    ];
    var m = await message.channel.send(animation[0].join(" "));
    await timeout(1000);
    for (var i = 1; i < animation.length; i++) {
      console.log(i)
      await timeout(800);
      m = await m.edit(animation[i].join(" "))
    }
    await message.channel.send(new RichEmbed().setColor(0x36393e).setTitle("Right let's do this"))
    if (args.op == "sharableroles") {
      var roles = await mongo.collection("sharableroles").find({}).toArray();
      roles.map(
        /**@param {SharableRole} sr */
        async(sr) => {
          /** @type {Role} */
          var discordRole = message.guild.roles.get(sr.role);
          await discordRole.delete("Fuck te roles");
          console.warn("Deleted a role")
        });
      await timeout(2000)
      message.channel.send(
        new RichEmbed()
        .setColor(0x36393e)
        .setTitle("I think we're done D: Purged " + roles.length + " roles")
      )
    }
  }
}
module.exports = JoinCommand;