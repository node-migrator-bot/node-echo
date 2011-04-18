var sha1 = require('./sha1.js');
var http = require('http');

var UsersAPI = function(options){
    /**
     * Users API for Echo
     * @class UsersAPI
     * @submodule UsersAPI
     * @param {Object} options object for options<br/>
     * <ul>
     *     <li>options.consumerKey</li>
     *     <li>options.consumerSecret</li>
     * </ul>
     * @constructor
     */
    var self = this;

    //Get required options
    if(!options || !options.consumerKey || !options.consumerSecret) throw { name: "node-echo: Option not set exception", message: "ItemsAPI requires the consumerKey option to be defined" };
    self.consumerKey = options.consumerKey;
    self.consumerSecret = options.consumerSecret;
    //Set defaults
    self.apiHost = 'api.echoenabled.com';
};


UsersAPI.prototype.get = function(id,callback){
    /**
     * Fetch user information
     * @method get
     * @param {string} id user identityURL
     * @param {function} callback callback
     */
    var url = '/v1/users/get';
    var self = this;
    var data = {identityURL:id};
    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,data);
    postData = sha1.sortIntoString(postData);

    var echoApi = http.createClient(80, self.apiHost);
    console.log(url + "?" + postData);
    var request = echoApi.request('GET', url + "?" + postData,
    {'host': self.apiHost, 'Content-Type': 'application/x-www-urlencoded', 'Content-Length': postData.length});
    request.end();
    request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', callback);
    });
};

UsersAPI.prototype.update = function(user,callback){
    /**
     * Update user information
     * @method get
     * @param {object} user user to update. Need to specify:
     * <ul>
     *     <li>user.identityURL : User identity URL</li>
     *     <li>user.subject : show which parameters should be updated</li>
     *     <li>user.content : contains data to be used for user update</li>
     * </ul>
     * @param {function} callback callback
     */
    var url = '/v1/users/update';
    var self = this;
    var postData = sha1.signRequest("POST","http://" + self.apiHost + url,this.consumerKey,this.consumerSecret,user);
    postData = sha1.sortIntoString(postData);

    var echoApi = http.createClient(80, self.apiHost);
    var request = echoApi.request('POST', url,
    {'host': self.apiHost, 'Content-Type': 'application/x-www-urlencoded', 'Content-Length': postData.length});
    request.end(postData);
    request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        response.on('end',callback);
    });
};

UsersAPI.prototype.whoAmI = function(user,callback){
    /**
     * Retrieve currently logged in user information by session ID
     * @method whoAmI
     * @param {object} user : info for the user. Need to specify:
     * <ul>
     *     <li>user.appKey : customer appKey</li>
     *     <li>user.sessionID : Backplane sessions ID for this user</li>
     * </ul>
     */
    var url = '/v1/users/whoami';
    var self = this;
    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,user);
    postData = sha1.sortIntoString(postData);

    var echoApi = http.createClient(80, self.apiHost);
    console.log(url + "?" + postData);
    var request = echoApi.request('GET', url + "?" + postData,
    {'host': self.apiHost, 'Content-Type': 'application/x-www-urlencoded', 'Content-Length': postData.length});
    request.end();
    request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', callback);
    });
};


exports.UsersAPI = UsersAPI;