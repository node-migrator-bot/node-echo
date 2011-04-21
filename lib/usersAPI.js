var req = require("./req.js").req;

var UsersAPI = Class.extend({
     parameters:{
        enumerable:true
    }
    ,init: function(){
        /**
         * Users API for Echo
         * @class UsersAPI
         * @submodule UsersAPI
         * @param {Object} parameters object for options<br/>
         * <ul>
         *     <li>parameters.consumerKey</li>
         *     <li>parameters.consumerSecret</li>
         *     <li>parameters.authMethod : optional, in ['oauth','basic']. Default 'oauth'</li>
         * </ul>
         * @constructor
         */

        //Get required options
        if(!this.parameters.consumerKey || !this.parameters.consumerSecret) throw { name: "UsersAPI: Option not set exception", message: "UsersAPI requires the consumerKey option to be defined" };
        if (!this.parameters.authMethod){
            this.parameters.authMethod = "oauth";
        }
        //Set defaults
        this.parameters.apiHost = 'api.echoenabled.com';
    }
    ,get : function(id,callback){
        /**
         * Fetch user information
         * @method get
         * @param {string} id user identityURL
         * @param {function} callback callback
         */
        var url = '/v1/users/get';
        var data = {identityURL:id};
        req.get(this.parameters,url,data,callback);
    }
    ,update : function(user,callback){
        /**
         * Update user information
         * @method update
         * @param {object} user user to update. Need to specify:
         * <ul>
         *     <li>user.identityURL : User identity URL</li>
         *     <li>user.subject : show which parameters should be updated</li>
         *     <li>user.content : contains data to be used for user update</li>
         * </ul>
         * @param {function} callback callback
         */
        var url = '/v1/users/update';
        req.post(this.parameters,url,user,callback)
    }
    ,whoAmI : function(user,callback){
        /**
         * Retrieve currently logged in user information by session ID
         * @method whoAmI
         * @param {object} user : info for the user. Need to specify:
         * <ul>
         *     <li>user.appKey : customer appKey</li>
         *     <li>user.sessionID : Backplane sessions ID for this user</li>
         * </ul>
         */
        var url = '/v1/users/whoami';
        req.get(this.parameters,url,user,callback);
    }
});




exports.UsersAPI = UsersAPI;