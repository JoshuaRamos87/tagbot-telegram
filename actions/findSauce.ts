const { searchPic } = require("iqdb-client");


module.exports = {

    findSauce: async function (ctx,URL,flags)
    {
      let result;
      //URL = 'https://i.pximg.net/img-original/img/2021/06/24/21/37/50/90781507_p0.jpg';
      ctx.reply("Loading results...")
      if(flags["-g"])
      {
        result = (await searchPic(URL, { lib: 'gelbooru' }))
      }
      else
      {
        result = (await searchPic(URL, { lib: 'www' }))
      }
      //see ./src/api.test.ts for more examples.
      //console.log(result.data)
      if(result.ok)
      {
        displayImageSauce(ctx,result.data);
      }
      else{
        ctx.reply("No good source found :(");
      }
    }
}

function displayImageSauce(ctx,jsonObject)
{
    if(jsonObject[1]["sourceUrl"].includes("https://"))
        ctx.reply(jsonObject[1]["sourceUrl"])
    else if(jsonObject[1]["sourceUrl"].includes("http://"))
        ctx.reply(jsonObject[1]["sourceUrl"])
    else
        ctx.reply("https://" + jsonObject[1]["sourceUrl"].substring(2))
}