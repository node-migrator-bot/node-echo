var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/';
var secrets;
var data = fs.readFileSync("./secrets.json",'utf8');

try { secrets = JSON.parse(data)} catch(err) { console.log("err:",err) }

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;



/* *************************
 *      USERS API          *
 * *************************/
/*
   Not that it does not work, I just don't have any idea of how it is supposed to work...
 */
 //var options = {
//     consumerKey:consumerKey
//    ,consumerSecret:consumerSecret
//    ,authHandler:"oauth"
//};
//
//var UsersAPI = new(Echo.UsersAPI)(options);
//
//UsersAPI.get("http://www.facebook.com/eprochasson",function(data){
//    console.log(require("util").inspect(data))
//});
//




/* *************************
 *       FEEDS API         *
 * *************************/

// OAuth authentication
var options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authHandler:"oauth"
};

var FeedsAPI = new (Echo.FeedsAPI)(options);

FeedsAPI.list(function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.register({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.unregister({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});

// Basic authentication
options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authHandler:"basic"
};

FeedsAPI = new (Echo.FeedsAPI)(options);

FeedsAPI.list(function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.register({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.unregister({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});




/* *************************
 *       ITEMS API         *
 * *************************/

options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authHandler:"basic"
    ,feed: feed
};

//Gives access to all Items method (Submitting/Searching/Like/Tag/... for Article/Comment/Status/Note
var ItemsAPI = new (Echo.ItemsAPI)(options);

// Search
ItemsAPI.search({
    "appkey": "dev.digitalbutter",
    "q": "scope:http://echo.butter.com.hk/*",
    "callback":"foo"} // callback is not implemented in this wrapper, but it will be transparently presented to Echo..
   ,function(data){
    console.log(util.inspect(data))
});

//Count
ItemsAPI.count({
    "appkey": "dev.digitalbutter",
    "q": "scope:http://echo.butter.com.hk/"}
   ,function(data){
    console.log(util.inspect(data))
});

/*
  If I can't get valid users, I can't post anything :/
 */
//var article = {
//     content:"This is an article"
//    ,title:"Title of this article"
//    ,permalink:"http://echo.butter.com.hk/ep/test/article1"
//    ,summary:"summary"
//};
//
//ItemsAPI.submitArticle(article,user,function(data){
//    console.log(util.inspect(data))
//});
//
//var comment = {
//     content:"This is a comment"
//    ,subject:"subject of this comment"
//    ,permalink:"http://echo.butter.com.hk/ep/test/comment1"
//};
//
//
//ItemsAPI.submitComment(comment,user,function(data){
//    console.log(util.inspect(data))
//});
//