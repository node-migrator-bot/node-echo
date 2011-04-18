var req = require("req.js").req
var KvsAPI = function(options){
    /**
     * Key-Value Store API for Echo
     * @class KvsAPI
     * @submodule KvsAPI
     * @param {Object} options object for options<br/>
     * <ul>
     *     <li>options.consumerKey</li>
     *     <li>options.consumerSecret</li>
     * </ul>
     * @constructor
     */
    //Get required options
    if(!options || !options.consumerKey || !options.consumerSecret) throw { name: "node-echo: Option not set exception", message: "KvsAPI requires the consumerKey option to be defined" };
    this.options = {};
    this.options.consumerKey = options.consumerKey;
    this.options.consumerSecret = options.consumerSecret;
    //Set defaults
    this.options.apiHost = 'api.echoenabled.com';
};

KvsAPI.prototype.put = function(kvs,callback){
    /**
     * Put data into the Echo Key-Value database to store the third-party widgets' arbitrary data elements permanently.
     * @method put
     * @param {object} kvs Key-Value pair to store. Specify:
     * <ul>
     *     <li>kvs.key : key</li>
     *     <li>kvs.value : value</li>
     *     <li>kvs.public : (optional, boolean) indicates if value is public or not (default: false)</li>
     * </ul>
     * @param {function} callback callback
     */
    if (!(kvs.public))kvs.public = false;
    var url = 'https://api.echoenabled.com/v1/kvs/put';
    req.post(this.options,url,kvs,callback)
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
    req.get(this.options,url,data,callback)
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
        data = key;
    }else{
        url = 'https://api.echoenabled.com/v1/kvs/delete';
        data = key;
    }
    req.get(this.options,url,data,callback)
};

exports.KvsAPI = KvsAPI;