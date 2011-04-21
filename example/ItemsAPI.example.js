var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/';
var options;
var data = fs.readFileSync("./secrets.json",'utf8');

var secrets = JSON.parse(data)
var myUser = JSON.parse(fs.readFileSync("./user.json",'utf8'));

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;

var showResponse = function(data){
    console.log(util.inspect(data))
};

options = {
     consumerKey:secrets.consumerKey
    ,consumerSecret:secrets.consumerSecret
    ,authMethod:"oauth" // Works with 'basic' too.
    ,feed: feed
};

//Gives access to all Items method (Submitting/Searching/Like/Tag/... for Article/Comment/Status/Note
var ItemsAPI = Echo.ItemsAPI.spawn({parameters:options});

// declare a user
var user = {
    "id":myUser.id
    ,"name":myUser.name
    ,"avatarURL":myUser.avatarURL
};

// define a dummy article
var article = {
    content:{
        content:"THIS IS CONTENT!"
       ,title:"THIS IS TITLE!"
       ,permalink:"http://echo.butter.com.hk/12345"
       ,summary:"You're the summary !"
    }
};

try{
// Post a new article :
ItemsAPI.submitArticle(article,user,showResponse);
} catch (e) { console.log(e)}

//Tag/Untag this article
ItemsAPI.tagArticle(article.content.permalink,{title:"awesome2",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome2"},user,showResponse);
ItemsAPI.untagArticle(article.content.permalink,{title:"awesome",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome"},user,showResponse);

// Like/Unlike this article
ItemsAPI.likeArticle(article.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/tag/like"},user,showResponse);
ItemsAPI.unlikeArticle(article.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/tag/like"},user,showResponse);

// Flag/unflag this article
ItemsAPI.flagArticle(article.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/flag"},user,showResponse);
ItemsAPI.unflagArticle(article.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/flag"},user,showResponse);

var comment = {
    content:{
        content:"This is a comment to that awesome article"
       ,subject:"I haz a subject"
       ,permalink:"http://echo.butter.com.hk/ep/test/comment/12350"
    }
    ,target:{type:ItemsAPI.TYPE_ARTICLE,id:article.content.permalink}
};
try{
ItemsAPI.submitComment(comment,user,showResponse);
} catch (e) { console.log(e) }

// Tag/Untag this comment
ItemsAPI.tagComment(comment.content.permalink,{title:"awesome2",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome2"},user,showResponse);
ItemsAPI.untagComment(comment.content.permalink,{title:"awesome",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome"},user,showResponse);

// Like/Unlike this comment
ItemsAPI.likeComment(comment.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/tag/like"},user,showResponse);
ItemsAPI.unlikeComment(comment.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/tag/like"},user,showResponse);

// Flag/unflag this comment
ItemsAPI.flagComment(comment.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/flag"},user,showResponse);
ItemsAPI.unflagComment(comment.content.permalink,{id:"http://echo.butter.com.hk/ep/test/article/flag"},user,showResponse);


var note = {
    content:{
        content:"This is a short note"
       ,permalink:"http://echo.butter.com.hk/ep/test/note/12350"
    }
    ,target:{type:ItemsAPI.TYPE_ARTICLE,id:article.content.permalink}
};

try{ ItemsAPI.submitNote(note,user,showResponse) } catch(e) { console.log("note",e) }

var status = {
    content:{
        content:"This is a status"
       ,permalink:"http://echo.butter.com.hk/ep/test/status/12345"
    }
    ,target:{type:ItemsAPI.TYPE_ARTICLE,id:article.content.permalink}
};

try {ItemsAPI.submitStatus(status,user,showResponse)}catch(e){console.log("status",e)}