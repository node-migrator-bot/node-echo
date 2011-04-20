var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/';
var options;
var data = fs.readFileSync("../secrets.json",'utf8');

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

var user = {
    "id":myUser.id
    ,"name":myUser.name
    ,"avatarURL":myUser.avatarURL
};


var article = {
     content:"This is an article"
    ,title:"I haz a title"
    ,permalink:"http://echo.butter.com.hk/ep/test/article"
    ,summary:"You're the summary !"
};


// Post a new article :
//ItemsAPI.submitArticle(article,user,showResponse);

var comment = {
     content:"This is a comment to that awesome article"
    ,subject:"I haz a subject"
    ,permalink:"http://echo.butter.com.hk/ep/test/comment"
    ,target:{type:'article',url:"http://echo.butter.com.hk/ep/test/article"} // That's where you say this comment is related to this article
    ,summary:"You're the summary !"
};

// Post a comment for this article :
//ItemsAPI.submitComment(comment,user,showResponse);

// Tag this article
//ItemsAPI.tagArticle(article,{title:"awesome",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome"},user,showResponse);


// Tag the comment :
ItemsAPI.tagComment(comment,{title:"awesome_comment",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome"},user,showResponse);


// Mark it too
//ItemsAPI.markArticle(article,{title:"hilarious",id:"http://echo.butter.com.hk/ep/test/article/tag/awesome"},user,showResponse);
