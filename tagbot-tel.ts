require("dotenv").config();
const {Telegraf} = require('telegraf')
const TOKEN = process.env.TOKEN;
const command = require('./command')
const bot = new Telegraf(TOKEN);


bot.use((ctx) => {
    //console.log("inside use")
    //console.log(ctx.update.message.text)
    
    command(bot,ctx)
})


bot.launch().then(() => {

console.log("I'm logged in!")

});