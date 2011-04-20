var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/';
var secrets;
var options;
var data = fs.readFileSync("../secrets.json",'utf8');

try { secrets = JSON.parse(data)} catch(err) { console.log("err:",err) }

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;



///* ************************************************************ *
// *                        ITEMS API                             *
// * ************************************************************ */

//options = {
//     consumerKey:""//consumerKey
//    ,consumerSecret:""//consumerSecret
//    ,authMethod:"basic"
//    ,feed: feed
//};
/* ************************************************** *
*   search/count/mux doesnt require key/secret       *
* ************************************************** */

//Gives access to all Items method (Submitting/Searching/Like/Tag/... for Article/Comment/Status/Note
//var ItemsAPI = Echo.ItemsAPI.spawn({parameters:options});
//
//// Search
//ItemsAPI.search({
//    "appkey": "dev.digitalbutter",
//    "q": "scope:http://echo.butter.com.hk/*",
//    "callback":"foo"} // callback is not implemented in this wrapper, but it will be transparently presented to Echo..
//   ,function(data){
//    console.log(util.inspect(data))
//});
//
////Count
//ItemsAPI.count({
//    "appkey": "dev.digitalbutter",
//    "q": "scope:http://echo.butter.com.hk/"}
//   ,function(data){
//    console.log(util.inspect(data))
//});

/* ************************************************ *
*                 USERS API                        *
* ************************************************ */
/*
   Not that it does not work, I just don't have any idea of how it is supposed to work...

*/
var user = {
    "id":"http://facebook.com/691133609"
    ,"name":"Emmanuel Prochasson"
    ,"avatarURL":"http://graph.facebook.com/691133609/picture?type=large"
};

//{"id":"ac1cb87d48654b14c6c4fd8c3a3f3da2","accounts":[
//],"loggedIn":"true"}]}},"echo":{"state":"Untouched"}});


var options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authMethod:"oauth"
    ,feed:"http://echo.butter.com.hk/"
};
//
//var UsersAPI = Echo.UsersAPI.spawn({parameters:options});
//
//UsersAPI.get("http://facebook.com/691133609",function(data){
//    console.log(require("util").inspect(data))
//});


/* ********************************************************** *
*       Submitting requires valid key/Secret                 *
* ********************************************************** */
var ItemsAPI = Echo.ItemsAPI.spawn({parameters:options});

var article = {
     content:"This is an article"
    ,title:"Title of this article"
    ,permalink:"http://echo.butter.com.hk/ep/test/article1"

    ,summary:"summary"
};


//ItemsAPI.submitArticle(article,user,function(data){
//    console.log(util.inspect(data))
//});

//sessionID=http%3A%2F%2Fapi.js-kit.com%2Fv1%2Fbus%2Fdigitalbutter%2Fchannel%2F129955563188299580

var comment = {
     content:"This is a comment"
    ,subject:"subject of this comment"
    ,target:{type:"http://activitystrea.ms/schema/1.0/article",url:"http://echo.butter.com.hk/ep/test/article1"}
    ,permalink:"http://echo.butter.com.hk/ep/test/comment"
};

ItemsAPI.submitComment(comment,user,function(data){
    console.log(util.inspect(data))
});
