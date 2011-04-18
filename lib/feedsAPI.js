var sha1 = require('./sha1.js');
var http = require('http');

var FeedsAPI = function(options){
    /**
     * Feeds API for Echo
     * @class FeedsAPI
     * @param {Object} options object for options<br/>
     * <ul><li>options.consumerKey</li>
     * <li>options.consumerSecret</li>
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


FeedsAPI.prototype.list = function(callback){
    /**
     * list all feeds attached to this consumer key
     * @method list
     * @param {function} callback callback
     */
    var url = '/v1/feeds/list';
    var self = this;
    var data = {};
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

FeedsAPI.prototype.register = function(feed,callback){
    /**
     * Register a new feed for a consumer key
     * @method register
     * @param {object} feed feed to register. Specify:
     * <ul>
     *     <li>feed.url : (mandatory) url of the new feed</li>
     *     <li>feed.interval : (optional) interval for polling the feed<li<
     * </ul>
     * @param {function} callback callback
     */
    var url = '/v1/feeds/register';
    if(!feed.interval){
        feed.interval = 10;
    }
    var self = this;

    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,feed);
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


FeedsAPI.prototype.unregister = function(feed,callback){
    /**
     * Unregister a feed for a consumer key
     * @method unregister
     * @param {object} feed feed to unregister. Specify:
     * <ul>
     *     <li>feed.url : (mandatory) url of the feed</li>
     * </ul>
     * @param {function} callback callback
     */

    var url = '/v1/feeds/unregister';
    var self = this;

    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,feed);
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

exports.FeedsAPI = FeedsAPI;