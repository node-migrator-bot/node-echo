var req = require("./req.js").req;

var FeedsAPI = function(options){
    /**
     * Feeds API for Echo
     * @class FeedsAPI
     * @submodule FeedsAPI
     * @param {Object} options object for options<br/>
     * <ul><li>options.consumerKey</li>
     * <li>options.consumerSecret</li>
     * </ul>
     * @constructor
     */

    //Get required options
    if(!options || !options.consumerKey || !options.consumerSecret) throw { name: "Options not set exception", message: "FeedsAPI requires the consumerKey option to be defined" };
    this.options = {};
    this.options.consumerKey = options.consumerKey;
    this.options.consumerSecret = options.consumerSecret;
    this.options.apiHost = 'api.echoenabled.com';
};


FeedsAPI.prototype.list = function(callback){
    /**
     * list all feeds attached to this consumer key
     * @method list
     * @param {function} callback callback
     */
    var url = '/v1/feeds/list';
    var data = {};
    req.get(this.options,url,data, callback);
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
    req.get(this.options,url,feed,callback)
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
    req.get(this.options,url,feed,callback)
};

exports.FeedsAPI = FeedsAPI;