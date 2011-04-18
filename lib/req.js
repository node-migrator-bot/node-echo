var http = require("http");
var sha1 = require("sha1");

exports.req = function(){
    /**
     * Post and Get action for Echo.
     * @class req
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
         * </ul>
         * @param {string} url URL representing the "action" of the post (depends on what is being posted)
         * @param {object} data Data to post
         * @param {function} callback callback called with the response of the POST
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;

        var postData = sha1.signRequest("POST","http://" + apiHost + url,consumerKey,consumerSecret,data);
        postData = sha1.sortIntoString(postData);

        var echoApi = http.createClient(80, apiHost);
        var request = echoApi.request('POST', url,
        {'host': apiHost, 'Content-Type': 'application/x-www-urlencoded', 'Content-Length': postData.length});
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

    my.get = function(options,url,data,callback){
        /**
         * GET method
         * @method get
         * @param {object} options Defines:
         * <ul>
         *     <li>options.consumerKey Echo API Key</li>
         *     <li>options.consumerSecret Echo API Secret</li>
         *     <li>options.apiHost Echo API Url</li>
         * </ul>
         * @param {string} url URL representing the "action" of the get (depends on what is being get-ed)
         * @param {object} data Data to get
         * @param {function} callback callback called with the response of the GET
         */
        var consumerKey = options.consumerKey;
        var consumerSecret = options.consumerSecret;
        var apiHost = options.apiHost;

        var postData = sha1.signRequest("GET","http://" + apiHost + url,consumerKey,consumerSecret,data);
        postData = sha1.sortIntoString(postData);

        var echoApi = http.createClient(80, apiHost);
        console.log(url + "?" + postData);
        var request = echoApi.request('GET', url + "?" + postData,
        {'host': apiHost, 'Content-Type': 'application/x-www-urlencoded', 'Content-Length': postData.length});
        request.end();
        request.on('response', function (response) {
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            response.on('data', callback);
        });
    }
}();