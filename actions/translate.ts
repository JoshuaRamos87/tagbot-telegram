module.exports = function (ctx,lang,text)
{
    const translate = require('@iamtraction/google-translate');

    translate(text, { to: lang }).then(res => {
    ctx.reply(res.text);
    }).catch(err => {
    ctx.reply("translation error occured, double check the target language parameter :3");
    });
}
