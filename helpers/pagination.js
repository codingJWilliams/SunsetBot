var util = require("./util")
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

exports.chunk = function (myarr) {
  var i,j,temparray,chunk = 5;
  var chunks = [];
  
  for (i=0,j=myarr.length; i<j; i+=chunk) {
    temparray = myarr.slice(i,i+chunk);
    chunks.push(temparray)
  };
  return chunks
}
exports.showPage = function showPage(pg, msg, chunks) {
  var ind = pg - 1;
  var chs = chunks[ind];
  var tot = chunks.length
  makePage(makeEmbed(chs, mgs, pg, tot), pg, tot);
}
async function makePage(emb, m) {
  var m = await m.edit(emb);
  if (m.reactions.size === 0) {
    await m.react("⬅");
    await m.react("➡");
    await m.react("🗑");
  }
  m.reactions.map(async (r) => {
    console.log(r.count)
    if (r.count != 1) { // If the reaction wasn't by bot
      console.log("delete")
      console.log(r.users.filter(u => u.client.user.id !== u.id).array())
      await r.remove(r.users.filter(u => u.client.user.id !== u.id).array()[0].id)
    }
  })
  return m
}
function makeEmbed(chunks, message, pg, tot) {
  var extra = [];
  var emb = new util.d.RichEmbed()
  .setTitle(":book: All Clans")
  .setDescription("Use `!clan <clan name>` for a longer description and a list of clan owners.")
  .setColor(0x0a96de)
  .setFooter(`Page ${pg} of ${tot}`)
  console.log("c")
  chunks.map(
    (clan) => 
      emb.addField(clan.displayName, `Owners: ${util.makePeopleList(clan.owners)}\n${getMString(clan.role, message.guild.members).amount} members.\n  ${clan.desc}`)
  )
  return emb
}
exports.makePage = makePage;
exports.makeEmbed = makeEmbed;