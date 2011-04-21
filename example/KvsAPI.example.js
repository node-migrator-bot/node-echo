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

var kvs = {
    "key":"key1"
    ,"value":"value1"
    ,"public":"false"
};

//Gives access to all Items method (Submitting/Searching/Like/Tag/... for Article/Comment/Status/Note
var KvsAPI = Echo.KvsAPI.spawn({parameters:options});

KvsAPI.put(kvs,showResponse);

KvsAPI.get(kvs,consumerKey,showResponse);

KvsAPI.del(kvs,showResponse)

var kvs = {
    "key":"key2"
    ,"value":"value2"
    ,"public":"true"
};
//
KvsAPI.put(kvs,showResponse);

KvsAPI.get(kvs,consumerKey,showResponse);

KvsAPI.del(kvs,showResponse);
