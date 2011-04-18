
var sha1 = require('./sha1.js');
var http = require('http');

var ItemsAPICore = function(options){
    /**
     * Implements the 4 methods for ItemsAPI (submit, search, count, mux)
     * @class ItemsAPICore
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


ItemsAPICore.prototype.submit = function(err,data,callback){
    /**
     * "submit API method" <br /> Endpoint to submit your data into the Echo Platform in the Activity Streams XML format. <br/> http://wiki.aboutecho.com/w/page/35059196/API-method-submit
     * @method submit
     * @param {string} err hopefully empty error
     * @param {Object} data data.content MUST contain XML-formatted data to submit
     * @param {function} callback
     */
    if (err){
        console.log(err)
    } else {
        var self = this;

        var url = "/v1/submit";

        var postData = sha1.signRequest("POST","http://" + self.apiHost + url,this.consumerKey,this.consumerSecret,data);
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
    }
};


ItemsAPICore.prototype.search = function(query, callback){
    /**
     * "search" API method <br /> Returns information about items that match the specified query in Activity Stream format. <br /> http://wiki.aboutecho.com/w/page/23491639/API-method-search
     * @method search
     * @param {Object} query Query to perform. Need to specify:
     * <ul>
     *     <li>query.q : Echo Query Language query</li>
     *     <li>query.appkey : customer appkey</li>
     *     <li>query.since : optional. Since parameter</li>
     * </ul>
     * @param {function} callback callback
     */
    var url = "/v1/search";
    var self = this;

    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,query);
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

ItemsAPICore.prototype.count = function(query,callback){
    /**
     * "count" API method. <br /> Returns a number of items that match the specified query in JSON format. <br/> http://wiki.aboutecho.com/w/page/27888212/API-method-count
     * @method count
     * @param {Object} query Query to perform. Need to specify:
     * <ul>
     *     <li>query.q : Echo Query Language query</li>
     *     <li>query.appkey : customer appkey</li>
     *     <li>query.since : optional. Since parameter</li>
     * </ul>
     * @param {function} callback callback.
     */
    var url = "/v1/count";
    var self = this;

    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,query);
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

ItemsAPICore.prototype.mux = function(query,callback){
    /**
     * "mux" API method <br/> The API method "mux" allows to "multiplex" requests, i.e. use a single API call to "wrap" several requests. The multiplexed requests are executed concurrently and independently by the Echo server. <br/> http://wiki.aboutecho.com/w/page/32433803/API-method-mux
     * @method mux
     * @param {object} query JSON array of queries
     * @param {function} callback callback
     */

    var url = "/v1/mux";
    var self = this;

    var postData = sha1.signRequest("GET","http://" + self.apiHost + url,self.consumerKey,self.consumerSecret,query);
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
}

exports.ItemsAPICore = ItemsAPICore;