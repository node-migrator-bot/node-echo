if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var req = require("./req.js").req;

var FeedsAPI = Class.extend({
    /**
     * Feeds API for Echo
     * @class FeedsAPI
     * @submodule FeedsAPI
     * @param {Object} parameters object for options<br/>
     * @param {Object} parameters object for options<br/>
     * <ul>
     *     <li>parameters.consumerKey</li>
     *     <li>parameters.consumerSecret</li>
     *     <li>parameters.authMethod : optional, in ['oauth','basic']. Default 'oauth'
     * </ul>
     * @constructor
     */
     parameters: {
        enumerable: true
    }
    ,init: function(){
        //Get required options
        if(!this.parameters.consumerKey || !this.parameters.consumerSecret) throw { name: "Options not set exception", message: "FeedsAPI requires the consumerKey and consumerSecret options to be defined" };
        this.parameters.apiHost = 'api.echoenabled.com';
        if (!this.parameters.authMethod){
            this.parameters.authMethod = "oauth";
        }
    }
    ,list: function(callback){
        /**
         * list all feeds attached to this consumer key
         * @method list
         * @param {function} callback callback
         */
        var url = '/v1/feeds/list';
        var data = "";
        req.get(this.parameters,url,data, callback);
    }
    ,register: function(feed,callback){
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
        req.get(this.parameters,url,feed,callback)
    }
    ,unregister: function(feed,callback){
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
        req.get(this.parameters,url,feed,callback)
    }
});



exports.FeedsAPI = FeedsAPI;