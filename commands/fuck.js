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
/**
 * @typedef {{ role: string, owner: string, _id: ObjectId }} SharableRole
 */
class JoinCommand extends Command {
  constructor() {
    super('fuck', {
      aliases: ['fuck'],
      userPermissions: ["ADMINISTRATOR"],
      args: [{
        id: "op",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
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
    if (args.op == "sharableroles") {
      var roles = await mongo.collection("sharableroles").find({}).toArray();
      roles.map(
        /**@param {SharableRole} sr */
        async(sr) => {
          /** @type {Role} */
          var discordRole = message.guild.roles.get(sr.role);
          //await discordRole.delete("Fuck te roles");
          console.warn("Deleted a role")
        });
      message.channel.send(
        new RichEmbed()
        .setColor(0x36393e)
        .setTitle("I think we're done D:")
      )
    }
  }
}
module.exports = JoinCommand;