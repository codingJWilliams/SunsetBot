const {
  AkairoClient
} = require('discord-akairo');
const config = require("./config.json");
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

const client = new AkairoClient({
  ownerID: ['193053876692189184'],
  prefix: ['!'],
  commandDirectory: './commands/',
  listenerDirectory: "./listeners/",
  allowMention: true
}, {
  disableEveryone: true
});


client.on("ready", () => {
  console.log("Ready :D")
})


var url = config.dbUrl;

MongoClient.connect(url, {
  authSource: "admin",
  appname: "sunset"
}).then( (db) => {
  global.mongo = db;
  console.log("DB Up :D")
})

client.login(config.token);