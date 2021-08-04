module.exports = {

    findWord: function(word,ctx,wordAction)
    {
        
      const http = require("https");
      let options = {
          "method": "GET",
          "hostname": "api.dictionaryapi.dev",
          "path": '/api/v2/entries/en_US/',
          "headers": 
          {
              'custom': 'Custom Header Demo works'
          }
      };
      options["path"] += word
      let jsonObject;
      let req = http.request(options, function (res) {
      let chunks = [];
      
      res.on("data", function (chunk) {
          chunks.push(chunk);
      });
      res.on("end", function () {
              let body = Buffer.concat(chunks);
              jsonObject = JSON.parse(body.toString())  
    

            if(jsonObject["title"] === "No Definitions Found")
            {
              ctx.reply(jsonObject["title"])
              return
            }

              try
              {
                switch(wordAction)
                {
                    case "def": displayDef(jsonObject,ctx); break;
                    case "syn": displaySyn(jsonObject,ctx); break;
                }
              }catch(err){}
              
              
          });
      });
      req.end();
    }
}

function displayDef(jsonObject,ctx)
{
    let str = ''
    for(let l = 0; l < Object.keys(jsonObject).length; l++)
        for(let i = 0; i < Object.keys(jsonObject[l]["meanings"]).length; i++)
        for(let j = 0; j < Object.keys(jsonObject[l]["meanings"][i]["definitions"]).length; j++)
        {
            str += "- " + jsonObject[l]["meanings"][i]["definitions"][j]["definition"] + '\n'
        }

    ctx.reply(str);
}

function displaySyn(jsonObject,ctx)
{
    if(jsonObject["title"] === "No Definitions Found")
    {
        ctx.reply(jsonObject["title"])
        return;
    }

    let str = ''
    for(let l = 0; l < Object.keys(jsonObject).length; l++)
    {
        for(let i = 0; i < Object.keys(jsonObject[l]["meanings"]).length; i++)
        {
            for(let j = 0; j < Object.keys(jsonObject[l]["meanings"][i]["definitions"]).length; j++)
            try
            {
                for(let n = 0; n < Object.keys(jsonObject[l]["meanings"][i]["definitions"][j]["synonyms"]).length; n++)
                {
                str += "- " + jsonObject[l]["meanings"][i]["definitions"][j]["synonyms"][n] + '\n'
                }
                    
            }
            catch(err){}
        }
    }
    if(str === '')
    ctx.reply("no synonym found");
    else
    ctx.reply(str);
}