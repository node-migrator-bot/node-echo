var https = require("https");
var sha1 = require("./sha1.js").sha1;
var base64 = require("base64");

exports.req = function(){
    /**
     * Post and Get action for Echo.
     * @class req
     * @private
     */
    var my = {};

    my.post = function(options,url,data,callback){
        /**
         * POST method
         * @method post
         * @param {object} options Defines:
         * <ul>
         *     <li>options.consumerKey Echo API Key</li>
         *     <li>options.consumerSecret Echo API Secret</li>
         *     <li>options.apiHost Echo API Url</li>
         *     <li>options.authMethod Authentication method, in ['oauth','basic']</li>
         * </ul>
         * @param {string} url URL representing the "action" of the post (depends on what is being posted)
         * @param {object} data Data to post
         * @param {function} callback callback called with the response of the POST
         */
        switch (options.authMethod){
            case "oauth":
                my.postOAuth(options,url,data,callback);
                break;
            case "basic":
                my.postBasic(options,url,data,callback);
                break;
            default:
                throw {name:'Illegal auth method exception',error:'auth method '+options.authMethod+" not valid"}
        }
    };

    my.get = function(options,url,data,callback){
        /**
         * GET method
         * @method get
         * @param {object} options Defines:
         * <ul>
         *     <li>options.consumerKey Echo API Key</li>
         *     <li>options.consumerSecret Echo API Secret</li>
         *     <li>options.apiHost Echo API Url</li>
         *     <li>options.authMethod Authentication method, in ['oauth','basic']</li>
         * </ul>
         * @param {string} url URL representing the "action" of the get (depends on what is being get-ed)
         * @param {object} data Data to get
         * @param {function} callback callback called with the response of the GET
         */
        switch (options.authMethod){
            case "oauth":
                my.getOAuth(options,url,data,callback);
                break;
            case "basic":
                my.getBasic(options,url,data,callback);
                break;
            default:
                throw {name:'Illegal auth method exception',error:'auth method '+options.authMethod+" not valid"}
        }
    };







    my.getOAuth = function(options,url,data,callback){
        /**
         * GET, OAuth authentication
         * @method getOAuth
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;
        var method = "GET";

        var postData = sha1.signRequest(
                method
                ,"https://" + apiHost + url
                ,consumerKey
                ,consumerSecret
                ,data);

        postData = sha1.sortIntoString(postData);

        var reqoptions = {
             'host' : apiHost
            ,'method': method
            ,'path':url+"?"+postData
            ,'headers':{
                 'Content-Type': 'application/x-www-urlencoded'
                ,'Content-Length': postData.length
            }
        };

        var request = https.request(reqoptions);
        request.end();

        request.on('response', function (response) {
            var res = {};
            res.status = response.statusCode;
            res.headers = response.headers;
            res.body = "";
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                res.body += chunk;
            });
            response.on('end',function(){
                callback(res);
            });
        });
    };


    my.postOAuth = function(options,url,data,callback){
        /**
         * POST, OAuth authentication
         * @method postOAuth
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;
        var method = "POST";

        var postData = sha1.signRequest(
                method
                ,"https://"+apiHost + url
                ,consumerKey
                ,consumerSecret
                ,data);

        postData = sha1.sortIntoString(postData);

        var reqoptions = {
             'host' : apiHost
            ,'method': method
            ,'path':url
            ,'headers':{
                 'Content-Type': 'application/x-www-urlencoded'
                ,'Content-Length': postData.length
            }
        };

        var request = https.request(reqoptions);
        request.end(postData);

        request.on('response', function (response) {
            var res = {};
            res.status = response.statusCode;
            res.headers = response.headers;
            res.body = "";
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                res.body += chunk;
            });
            response.on('end',function(){
                callback(res);
            });
        });

    };


    my.getBasic = function(options,url,data,callback){
        /**
         * GET Method, Basic authentication
         * @method getBasic
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;
        var method = "GET";
        var loginfo = base64.encode(consumerKey+":"+consumerSecret);

        var postData = sha1.sortIntoString(data);
        if (postData.length > 0){
            postData = "?"+postData;
        }

        var reqoptions = {
             'host' : apiHost
            ,'method': method
            ,'path':url+postData
            ,'headers':{
                 'Content-Type': 'application/x-www-urlencoded'
                ,'Content-Length': postData.length
                ,'Authorization':'Basic '+loginfo
            }
        };

        var request = https.request(reqoptions);
        request.end();

        request.on('response', function (response) {
            var res = {};
            res.status = response.statusCode;
            res.headers = response.headers;
            res.body = "";
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                res.body += chunk;
            });
            response.on('end',function(){
                callback(res);
            });
        });
    };

    my.postBasic = function(options,url,data,callback){
        /**
         * POST Method, Basic authentication
         * @method postBasic
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;
        var method = "POST";

        var loginfo = base64.encode(consumerKey+":"+consumerSecret);

        var postData = sha1.sortIntoString(data);

        var reqoptions = {
             'host' : apiHost
            ,'method': method
            ,'path':url
            ,'headers':{
                 'Authorization':'Basic '+loginfo
                ,'Content-Type': 'application/x-www-urlencoded'
                ,'Content-Length': postData.length
            }
        };

        var request = https.request(reqoptions);
        request.end(postData);

        request.on('response', function (response) {
            var res = {};
            res.status = response.statusCode;
            res.headers = response.headers;
            res.body = "";
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                res.body += chunk;
            });
            response.on('end',function(){
                callback(res);
            });
        });
    };

    return my;
}();