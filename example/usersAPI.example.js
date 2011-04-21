var Echo = require("echo");
var util = require("util");
var fs = require("fs");
var secrets;
var options;
var data = fs.readFileSync("./secrets.json",'utf8');
var myUser = JSON.parse(fs.readFileSync("./user.json",'utf8'));

try { secrets = JSON.parse(data)} catch(err) { console.log("err:",err) }

var consumerKey = secrets.consumerKey;
var consumerSecret = secrets.consumerSecret;

var showResponse = function(data){
    console.log(util.inspect(data))
};

var user = {
    "id":myUser.id
    ,"name":myUser.name
    ,"avatarURL":myUser.avatarURL
};

options = {
     consumerKey:consumerKey
    ,consumerSecret:consumerSecret
    ,authMethod:"oauth" // Also support 'basic' authentication
};

var UsersAPI = Echo.UsersAPI.spawn({parameters:options});


// Get information for a user
//UsersAPI.get(user.id,showResponse);


// Update a user (in this case : give it administrator status \o/)
UsersAPI.update({
     id:user.id
    ,subject:'roles'
    ,content:"administrator"
}, showResponse);

// Tell you who you are
user = {
     appkey:consumerKey
    ,sessionID:myUser.sessionID
};
// Retrieve currently logged in user information by session ID
//UsersAPI.whoAmI(user,showResponse);