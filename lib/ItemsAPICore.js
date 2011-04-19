var req = require("req.js").req;

var ItemsAPICore = function(options){
    /**
     * Implements the 4 methods for ItemsAPI (submit, search, count, mux)
     * @class ItemsAPICore
     * @param {Object} options object for options<br/>
     * <ul>
     *     <li>options.consumerKey</li>
     *     <li>options.consumerSecret</li>
     *     <li>options.authHandler : optional, in ['oauth','basic']. Default 'oauth'
     * </ul>
     * @constructor
     */

    //Get required options
    if(!options || !options.consumerKey || !options.consumerSecret) throw { name: "Options not set exception", message: "ItemsAPICore requires the consumerKey option to be defined" };
    this.options = {};
    this.options.consumerKey = options.consumerKey;
    this.options.consumerSecret = options.consumerSecret;
    //Set defaults
    this.options.apiHost = 'api.echoenabled.com';
    if (options.authHandler){
        this.options.authHandler = options.authHandler;
    } else {
        this.options.authHandler = "oauth";
    }
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
        var url = "/v1/submit";
        req.post(this.options,url,data,callback)
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
    req.get(this.options,url,query,callback);
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
    req.get(this.options,url,query,callback)
};

ItemsAPICore.prototype.mux = function(query,callback){
    /**
     * "mux" API method <br/> The API method "mux" allows to "multiplex" requests, i.e. use a single API call to "wrap" several requests. The multiplexed requests are executed concurrently and independently by the Echo server. <br/> http://wiki.aboutecho.com/w/page/32433803/API-method-mux
     * @method mux
     * @param {object} query JSON array of queries
     * @param {function} callback callback
     */
    var url = "/v1/mux";
    req.get(this.options,url,query,callback)
}

exports.ItemsAPICore = ItemsAPICore;