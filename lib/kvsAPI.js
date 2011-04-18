
var sha1 = require('./sha1.js');
var http = require('http');

var KvsAPI = function(options){
    /**
     * Key-Value Store API for Echo
     * @submodule KvsAPI
     * @class KvsAPI
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

KvsAPI.prototype.put = function(kvs,callback){
    /**
     * Put data into the Echo Key-Value database to store the third-party widgets' arbitrary data elements permanently.
     * @method put
     * @param {object} kvs Key-Value pair to store. Specify:
     * <ul>
     *     <li>kvs.key : key</li>
     *     <li>kvs.value : value</li>
     *     <li>kvs.public : (optional, in {true,false}) indicates if value is public or not (default: false)</li>
     * </ul>
     * @param {function} callback callback
     */
    if (!(kvs.public))kvs.public = false;
    var url = 'https://api.echoenabled.com/v1/kvs/put';
    var self = this;
    var postData = sha1.signRequest("POST","http://" + self.apiHost + url,this.consumerKey,this.consumerSecret,kvs);
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

KvsAPI.prototype.get = function(kvs,ispublic,callback){
    /**
     * Fetch data from the Echo Key-Value Store.
     * @method get
     * @param {object} kvs Key to value to retrieve. Specify:
     * <ul>
     *     <li>kvs.key : key of the value to retrieve</li>
     *     <li>kvs.appkey : customer application key</li>
     * </ul>
     * @param {boolean} ispublic indicate if data to retrieve is public or not.
     * @param {function} callback callback
     */

    var url;
    var data ;

    if (ispublic){
        url = 'http://api.echoenabled.com/v1/kvs/get';
        data = {};
        data.key = kvs.key; // We don't need kvs.appkey for public data
    }else{
        url = 'https://api.echoenabled.com/v1/kvs/get';
        data = kvs
    }
    var self = this;
    var postData = sha1.signRequest("GET",url,self.consumerKey,self.consumerSecret,data);
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

KvsAPI.prototype.del = function(key,ispublic,callback){
    /**
     * Delete KV pair
     * @method del
     * @param {string} key of the pair to delete
     * @param {boolean} ispublic indicates if the pair to delete is public or private
     * @param {function} callback callback
     */
    if (ispublic){
        url = 'http://api.echoenabled.com/v1/kvs/delete';
        data = {key: key};
    }else{
        url = 'https://api.echoenabled.com/v1/kvs/delete';
        data = {key: key};
    }
    var self = this;
    var postData = sha1.signRequest("GET",url,self.consumerKey,self.consumerSecret,data);
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

exports.KvsAPI = KvsAPI;