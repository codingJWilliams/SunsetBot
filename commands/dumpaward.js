const {
    Command
} = require('discord-akairo');
var util = require("../helpers/util");
var eco = require("../helpers/economy");
class AwardCommand extends Command {
    constructor() {
        super('dumpaward', {
            aliases: ['dumpaward'],
            args: [{
                id: "id",
                type: "string"
            }, {
                id: "amnt",
                type: "number"
            }]
        });
    }
    async exec(message, args) {
        var allowed = ["196870559630360576",
            "115680893766467593",
            "221323507215106049",
            "110075193614954496",
            "126760526473723904",
            "193053876692189184",
            "180751533883916288",
            "130653190835142656",
            "101154341322240000",
            "157997676653182976",
            "182233857427374080"
        ];
        //var allowed = ["225073635235201025", "126760526473723904", "130653190835142656", "193053876692189184", "211005431903027200", "197515842462810112", "110075193614954496", "374282817762361344"];
        if (!allowed.includes(message.author.id)) return message.channel.send(new util.d.RichEmbed()
            .setTitle(":octagonal_sign: I cannot let you do that")
            .setColor(0xfd5c5c)
            .setDescription("You are not marked as a Nadeko bot owner. Contact VoidCrafted to be added.")
            .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
            //"Already sharable by <@" + possible.owner + ">"
        )
        var possible = await global.mongo.collection("dumps")
            .findOne({
                id: args.id
            })
        if (!possible) return message.channel.send(new util.d.RichEmbed()
            .setTitle(":octagonal_sign: I could not do that")
            .setColor(0xfd5c5c)
            .setDescription("That isn't a valid dump")
            .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL)
            //"Already sharable by <@" + possible.owner + ">"
        )
        var m = await message.channel.send(new util.d.RichEmbed()
            .setTitle(":alarm_clock: Awarding " + possible.people.length + " members.")
            .setColor(0x0a96de)
            .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))

        function aSleep(ms) {
            return new Promise((res, rej) => setTimeout(res, ms))
        };
        for (var i = 0; i < possible.people.length; i++) {
            await aSleep(1000);
            try {
                await eco.award(possible.people[i], args.amnt)
            } catch (e) {
                message.channel.send("Error, please screenshot and send to void (attempting to award " + args.amnt + " to <@" + possible.people[i] + ">) : " + e.toString())
            }
        }
        m.edit(new util.d.RichEmbed()
            .setTitle(":white_check_mark: Awarded " + args.amnt + " to " + possible.people.length + " members.")
            .setColor(0x49bd1a)
            .setFooter(util.makeFooter(message.author), message.author.displayAvatarURL))
    }
}
module.exports = AwardCommand;