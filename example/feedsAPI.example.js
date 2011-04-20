var Echo = require("echo");
var util = require("util");
var fs = require("fs");

var feed = 'http://echo.butter.com.hk/ep/test';
var secrets;
var options;
var data = fs.readFileSync("./secrets.json",'utf8');

try { secrets = JSON.parse(data)} catch(err) { console.log("err:",err) }

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;

var showResponse = function(data){
    console.log(util.inspect(data))
};

options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authMethod:"oauth" // 'basic' authentication also supported.
};

// Create a new instance of FeedsAPI
var FeedsAPI = Echo.FeedsAPI.spawn({parameters:options});


// List feeds attached to the consumerKey
FeedsAPI.list(showResponse);


// Register a feed for that consumer key
FeedsAPI.register({url:feed},showResponse);

// Unregister a feed for that consumer key
FeedsAPI.unregister({url:feed},showResponse);
