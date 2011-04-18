var req = require("req.js");

var UsersAPI = function(options){
    /**
     * Users API for Echo
     * @class UsersAPI
     * @submodule UsersAPI
     * @param {Object} options object for options<br/>
     * <ul>
     *     <li>options.consumerKey</li>
     *     <li>options.consumerSecret</li>
     * </ul>
     * @constructor
     */

    //Get required options
    if(!options || !options.consumerKey || !options.consumerSecret) throw { name: "node-echo: Option not set exception", message: "ItemsAPI requires the consumerKey option to be defined" };
    this.options = {};
    this.options.consumerKey = options.consumerKey;
    this.options.consumerSecret = options.consumerSecret;
    //Set defaults
    this.options.apiHost = 'api.echoenabled.com';
};


UsersAPI.prototype.get = function(id,callback){
    /**
     * Fetch user information
     * @method get
     * @param {string} id user identityURL
     * @param {function} callback callback
     */
    var url = '/v1/users/get';
    var data = {identityURL:id};
    req.get(this.options,url,data,callback);
};

UsersAPI.prototype.update = function(user,callback){
    /**
     * Update user information
     * @method get
     * @param {object} user user to update. Need to specify:
     * <ul>
     *     <li>user.identityURL : User identity URL</li>
     *     <li>user.subject : show which parameters should be updated</li>
     *     <li>user.content : contains data to be used for user update</li>
     * </ul>
     * @param {function} callback callback
     */
    var url = '/v1/users/update';
    req.post(this.options,url,user,callback)
};

UsersAPI.prototype.whoAmI = function(user,callback){
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
    req.get(this.options,url,user,callback);
};


exports.UsersAPI = UsersAPI;