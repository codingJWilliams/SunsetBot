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
    if (args.op == "sharableroles") {
      /**@type {Db} */
      var mongo = global.mongo;
      /**
       * @type {Message}
       */
      var m = await message.channel.send(
        new RichEmbed()
        .setColor(0x36393e)
        .setTitle("Fuck, u sure?")
        .setTitle("React <:gasm:310821749467906048> to show that ur sure bro")
      );
      await m.react(":gasm:310821749467906048");
      var coll = await m.awaitReactions(
        /**
         * @param {MessageReaction} reaction
         * @param {User} user
         */
        (reaction, user) => {
          return reaction.emoji.id == "310821749467906048";
        }, {
          max: 1
        });
      console.log(coll)
      /*var roles = await mongo.collection("sharableroles").find({}).toArray();
      roles.map(
        /**@param {SharableRole} sr * /
        async(sr) => {
          /** @type {Role} * /
          var discordRole = message.guild.roles.get(sr.role);
          await discordRole.delete("Fuck te roles");
          console.warn("Deleted a role")
        });*/
    }
  }
}
module.exports = JoinCommand;