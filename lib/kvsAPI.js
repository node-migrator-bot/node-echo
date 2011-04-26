if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var req = require("./req.js").req;
var cons = require("./Const.js");

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
         *     <li>parameters.authMethod : optional, in ['oauth','basic']. Default 'oauth'</li>
         * </ul>
         * @constructor
         */
        //Get required options
        if(!this.parameters.consumerKey || !this.parameters.consumerSecret) throw { name: "KvsAPI: Option not set exception", message: "KvsAPI requires the consumerKey option to be defined" };
        //Set defaults
        this.parameters.apiHost = cons.API_HOST;
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
        var url = '/v1/kvs/put';
        req.post(this.parameters,url,kvs,callback)
    }
    ,get: function(kvs,appkey,callback){
        /**
         * Fetch data from the Echo Key-Value Store.
         * @method get
         * @param {object} kvs Key of the value to retrieve. Specify:
         * <ul>
         *     <li>kvs.key : key of the value to retrieve</li>
         *     <li>kvs.public : (optional) indicate if the KV pair is public or not</li>
         * </ul>
         * @param {string} appkey : customer application key</li>
         * @param {function} callback callback
         */

        var url = '/v1/kvs/get';
        req.get(this.parameters,url,kvs,callback)
    }
    ,del: function(kvs,callback){
        /**
         * Delete KV pair
         * @method del
         * <ul>
         *     <li>kvs.key : key of the value to retrieve</li>
         *     <li>kvs.public : (optional) indicate if the KV pair is public or not</li>
         * </ul>
         * @param {function} callback callback
         */
        var url = '/v1/kvs/delete';
        req.get(this.parameters,url,kvs,callback)
    }
});


exports.KvsAPI = KvsAPI;