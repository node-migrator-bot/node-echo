var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/';
var secrets;
var data = fs.readFileSync("./secrets.json",'utf8');

try { secrets = JSON.parse(data)} catch(err) { console.log("err:",err) }
console.log(util.inspect(secrets));

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;

/* ************************************************************ *
 *       FEEDS API  (will only work with valid key/secret)      *
 * ************************************************************ */

// OAuth authentication
var options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authMethod:"oauth"
};

var FeedsAPI = Echo.FeedsAPI.spawn({parameters:options});

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
    ,authMethod:"basic"
};

FeedsAPI = Echo.FeedsAPI.spawn({parameters:options});

FeedsAPI.list(function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.register({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});

FeedsAPI.unregister({url:'http://echo.butter.com.hk/ep/test/'},function(data){
    console.log(require("util").inspect(data))
});


///* ************************************************************ *
// *                        ITEMS API                             *
// * ************************************************************ */

options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authMethod:"basic"
    ,feed: feed
};
/* ************************************************** *
*   search/count/mux doesnt require key/secret       *
* ************************************************** */

//Gives access to all Items method (Submitting/Searching/Like/Tag/... for Article/Comment/Status/Note
var ItemsAPI = Echo.ItemsAPI.spawn({parameters:options});

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
//
///* ************************************************ *
// *                 USERS API                        *
// * ************************************************ */
///*
//   Not that it does not work, I just don't have any idea of how it is supposed to work...
// */
// //var options = {
////     consumerKey:consumerKey
////    ,consumerSecret:consumerSecret
////    ,authMethod:"oauth"
////};
////
////var UsersAPI = Echo.UsersAPI.spawn({parameters:options});
////
////UsersAPI.get("http://www.facebook.com/eprochasson",function(data){
////    console.log(require("util").inspect(data))
////});
//
//
//
//
///* ********************************************************** *
// *       Submitting requires valid key/Secret                 *
// * ********************************************************** */
//
////var article = {
////     content:"This is an article"
////    ,title:"Title of this article"
////    ,permalink:"http://echo.butter.com.hk/ep/test/article1"
////    ,summary:"summary"
////};
////
////ItemsAPI.submitArticle(article,user,function(data){
////    console.log(util.inspect(data))
////});
////
////var comment = {
////     content:"This is a comment"
////    ,subject:"subject of this comment"
////    ,permalink:"http://echo.butter.com.hk/ep/test/comment1"
////};
////
////
////ItemsAPI.submitComment(comment,user,function(data){
////    console.log(util.inspect(data))
////});
////