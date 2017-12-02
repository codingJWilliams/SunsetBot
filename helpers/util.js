var moment = require("moment");

exports.d = require("discord.js");
exports.red = 0xFF0000
exports.makeFooter = (user) => `${user.username} | ${moment().format("MMMM Do, h:mm:ss a")}`
exports.makePeopleList = (peopleIds) => peopleIds.map(p => `<@${p}>`).join(", ")