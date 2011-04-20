if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var req = require("./req.js").req;

var KvsAPI = Class.extend({
     parameters:{
        enumerable:true
    }
    ,init:function(){
        /**
         * Key-Value Store API for Echo
         * @class KvsAPI
         * @submodule KvsAPI
         * @param {Object} parameters object for options<br/>
         * <ul>
         *     <li>parameters.consumerKey</li>
         *     <li>parameters.consumerSecret</li>
         *     <li>parameters.authMethod : optional, in ['oauth','basic']. Default 'oauth'
         * </ul>
         * @constructor
         */
        //Get required options
        if(!this.parameters.consumerKey || !this.parameters.consumerSecret) throw { name: "KvsAPI: Option not set exception", message: "KvsAPI requires the consumerKey option to be defined" };
        //Set defaults
        this.parameters.apiHost = 'api.echoenabled.com';
        if (!this.parameters.authMethod){
            this.parameters.authMethod = "oauth";
        }
    }
    ,put: function(kvs,callback){
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
        req.post(this.parameters,url,kvs,callback)
    }
    ,get: function(kvs,ispublic,callback){
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
        req.get(this.parameters,url,data,callback)
    }
    ,del: function(key,ispublic,callback){
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
        req.get(this.parameters,url,data,callback)
    }
});


exports.KvsAPI = KvsAPI;