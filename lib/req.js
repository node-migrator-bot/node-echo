var http = require("http");
var https = require("https");
var sha1 = require("./sha1.js").sha1;
var base64 = require("base64");

exports.req = function(){
    /**
     * Post and Get action for Echo.
     * @class req
     */
    var my = {};

    my.reqOAuth = function(method,options,url,data,callback){
        /**
         * GET/POST, OAuth authentication
         * @method reqOAuth
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;

        var postData = sha1.signRequest(
                method
                ,"http://" + apiHost + url
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
        }
        var request = http.request(reqoptions);
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

    my.reqBasic = function(method,options,url,data,callback){
        /**
         * GET/POST Method, Basic authentication
         * @method reqBasic
         * @private
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;

        var loginfo = base64.encode(consumerKey+":"+consumerSecret);

        var reqoptions = {
             'host' : apiHost
            ,'method': method
            ,'path':url
            ,'headers':{
                 'Authorization':'Basic '+loginfo
                ,'Content-Type': 'application/x-www-urlencoded'
                ,'Content-Length': data.length
            }
        }
        var request = https.request(reqoptions);
        request.end(data);

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


    my.post = function(options,url,data,callback){
        /**
         * POST method
         * @method post
         * @param {object} options Defines:
         * <ul>
         *     <li>options.consumerKey Echo API Key</li>
         *     <li>options.consumerSecret Echo API Secret</li>
         *     <li>options.apiHost Echo API Url</li>
         *     <li>options.authHandler Authentication method, in ['oauth','basic']</li>
         * </ul>
         * @param {string} url URL representing the "action" of the post (depends on what is being posted)
         * @param {object} data Data to post
         * @param {function} callback callback called with the response of the POST
         */
        switch (options.authHandler){
            case "oauth":
                my.reqOAuth("POST",options,url,data,callback);
                break;
            case "basic":
                my.reqBasic("POST",options,url,data,callback);
                break;
            default:
                throw {name:'Illegal auth handler exception',error:'auth Handler '+options.authHandler+" not valid"}
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
         *     <li>options.authHandler Authentication method, in ['oauth','basic']</li>
         * </ul>
         * @param {string} url URL representing the "action" of the get (depends on what is being get-ed)
         * @param {object} data Data to get
         * @param {function} callback callback called with the response of the GET
         */
        switch (options.authHandler){
            case "oauth":
                my.reqOAuth("GET",options,url,data,callback);
                break;
            case "basic":
                my.reqBasic("GET",options,url,data,callback);
                break;
            default:
                throw {name:'Illegal auth handler exception',error:'auth Handler '+options.authHandler+" not valid"}
        }
    };

    return my;
}();