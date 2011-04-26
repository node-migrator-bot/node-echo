//Load dependencies
if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var utils = require("./utils.js");
var render = require("./render.js").Render;
var cons = require("./Const.js");

var ActivityObject = Class.extend({
    /**
     * Parent class to define all the Activity Objects Echo deals with, and their method for XML rendering according to their verb.
     * <a href="http://wiki.aboutecho.com/w/page/24780107/How%20To%20-%20Getting%20us%20your%20Firehose#Supportedactivityobjecttypes">See Echo documentation</a>
     * 
     * @class ActivityObject
     * @constructor
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the item you want to create (depends on its kind, see subclasses documentation)</li>
     *     <li>properties.item.user : the user interacting with this item</li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb (post) for this item</li>
     * </ul>
     * @private
     */

     init: function(){
        /**
         * Initialised the ActivityObject. Meta data Check.
         * Needs to be extended by Child classes (for content checking).
         * Is automatically called at object spawning.
         * @method init
         */
        if (!(this.item.user && this.item.user.id && this.item.user.avatarURL && this.item.user.name)){
            throw {name :"Invalid user exception", error : "Invalid user"}
        }
        if (!(this.item.feed)){
            throw {name : "Invalid options exception", error :"Invalid feed"};
        }
        // Set defaults.
        this.item.type = "abstract";
        if(!this.item.verb){
            this.verb = cons.VERB_POST;
        } else {this.verb = this.item.verb}
        if(!(this.item.target)){ this.item.target = {} }

     }
     ,renderPost: function(callback){
       /**
        * Forge a proper XML document ready for posting, using base template.
        * @method renderPost
        * @param {function} callback callback (should very likely be a call to a "submit" method)
        */
        var self = this;
        this.renderItem(function(err,renderedData){
           if(err){ callback(err,"") } else {
              render.renderTemplate(
                 __dirname + '/templates/base.xml'
                ,self.itemTemplate(renderedData)
                ,function(error,renderedMessage){ // Third arg of render.renderTemplate
                    if(error)callback(error,"");
                    else{
                       callback("",{ content: renderedMessage })
                    }
                 });
              }
           }
        )
     }
    ,itemTemplate: function(data){
        /**
         * Select and return the proper properties for an object.
         * @method itemTemplate
         * @private
         */
        var date = utils.ISODateString(new Date());
        return {
                activityObject: data
               ,feed: {
                  idUrl: this.item.feed,
                  updated: date
               }
               ,entry: {
                  id: this.item.content.permalink,
                  published: date
               }
               ,target: {
                   type: this.item.target.type
                  ,url: this.item.target.id
               }
               ,actor: {
                    url: this.item.user.id
                   ,name: this.item.user.name
                   ,avatar: this.item.user.avatarURL
               }
               ,verb:this.verb
            }
    }
    ,renderItem : function(callback){
        /**
         * Render the part of the Item that is <i>specific</i> to this item, using templates.
         * @method renderItem
         * @param {function} callback callback
         */
        callback("","")
    } // Different for all items, must be extended

    // Properties (common to all Items):
    ,item:{
        /**
         * Define the values for this item.
         * @property item
         */
        enumerable: true
    }
});

var Article = ActivityObject.extend({
    /**
     * Article.
     * @class Article
     * @extends ActivityObject
     * @private
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the article. Need to specify:
     *     <ul>
     *         <li>properties.item.content.title : title of the article</li>
     *         <li>properties.item.content.content : the main content of the article,</li>
     *         <li>properties.item.content.permalink : a unique URL for this item.</li>
     *         <li>properties.item.content.summary : a short summary for that item</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : (optional) a target for this item. Default: current item. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb (post) for this item</li>
     * </ul>
     * @constructor
     *
     */
    init: function(){
        // Call parent
        this._super();

        // Set specific parameters
        this.item.type = cons.TYPE_ARTICLE;

        // Check content:        
        if (!(this.item.content && this.item.content.title && this.item.content.summary && this.item.content.content && this.item.content.permalink && this.item.feed)){
            throw {name : "Invalid Article exception", error:"Article needs a title, a summary, a content, a permalink and a feed ID"}
        } else {
            // Format content
            this.item.content.summary = utils.Encoder.htmlEncode(this.item.content.summary,true);
            this.item.content.content = utils.Encoder.htmlEncode(this.item.content.content,true);
            this.item.content.title = utils.Encoder.htmlEncode(this.item.content.title,true);
        }

        if(!(this.item.target && this.item.target.id && this.item.target.type)){
             this.item.target = {
                 id:this.item.content.permalink
                 , type : this.item.type
             }
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/article.xml', { article: this.item.content }, callback)
    }
});


var Comment = ActivityObject.extend({
    /**
     * Comment.
     * @extends ActivityObject
     * @class Comment
     * @private
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the comment. Need to specify:
     *     <ul>
     *         <li>properties.item.content.subject : subject of the comment (can be blank, can't be undefined</li>
     *         <li>properties.item.content.content : the main content of the comment,</li>
     *         <li>properties.item.content.permalink : a unique URL for this item.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that comment.</li>
     *     <li>properties.item.target : (optional) a target for this item. Default: Current item. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb (post) for this item</li>
     * </ul>
     * @constructor
     */
    init: function(){
        // Call parent init
        this._super();
        // Set specifics
        this.item.type = cons.TYPE_COMMENT;
        //Data check and formatting
        if (!(this.item.content && this.item.content.content && this.item.content.subject && this.item.content.permalink)){
            throw {name : "Invalid Comment exception", error:"Comment needs a subject, a content and a permalink"}
        } else {
            this.item.content.content = utils.Encoder.htmlEncode(this.item.content.content,true);
            this.item.content.subject = utils.Encoder.htmlEncode(this.item.content.subject,true);
        }
        if(!(this.item.target && this.item.target.id && this.item.target.type)){
             this.item.target = {
                 id:this.item.content.permalink
                 , type : this.item.type
             }
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/comment.xml', { comment: this.item.content }, callback)
    }
});

var Note = ActivityObject.extend({
    /**
     * Note.
     * @private
     * @extends ActivityObject
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the note. Need to specify:
     *     <ul>
     *         <li>properties.item.content.content : the main content of the Note.</li>
     *         <li>properties.item.content.permalink : a unique URL for this item.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : (optional) a target for this item. Default: Current item. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb (post) for this item</li>
     * </ul>
     * @class Note
     * @constructor
     */
    init: function(){
        // Call parent init
        this._super();
        // Set specifics
        this.item.type = cons.TYPE_NOTE;
        //Data check and formatting
        if (!(this.item.content && this.item.content.content && this.item.content.permalink)){
            throw {name : "Invalid Note exception", error:"Note needs a content and a permalink"}
        } else {
            this.item.content.content = utils.Encoder.htmlEncode(this.item.content.content,true);
        }
        if(!(this.item.target && this.item.target.id && this.item.target.type)){
             this.item.target = {
                 id:this.item.content.permalink
                 , type : this.item.type
             }
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/note.xml', { note: this.item.content }, callback)
    }
});

// Interestingly, a "Status" is strictly equivalent to a "Note". But it's worth separating both objects.
var Status = ActivityObject.extend({
    /**
     * Status.
     * @class Status
     * @private
     * @extends ActivityObject
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the status. Need to specify:
     *     <ul>
     *         <li>properties.item.content.content : the main content of the status.</li>
     *         <li>properties.item.content.permalink : a unique URL for this item.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : (optional) a target for this item. Default: Current item. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb (post) for this item</li>
     * </ul>
     * @constructor
     */
    init: function(){
        // Call parent init
        this._super();
        // Set specifics
        this.item.type = cons.TYPE_STATUS;
        //Data check and formatting
        if (!(this.item.content && this.item.content.content && this.item.content.permalink)){
            throw {name : "Invalid Status exception", error:"Status needs a content and a permalink"}
        } else {
            this.item.content.content = utils.Encoder.htmlEncode(this.item.content.content,true);
        }
        if(!(this.item.target && this.item.target.id && this.item.target.type)){
             this.item.target = {
                 id:this.item.content.permalink
                 , type : this.item.type
             }
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/status.xml', { status: this.item.content }, callback)
    }
});

var Tag = ActivityObject.extend({
    /**
     * Tag/Untag.
     * @extends ActivityObject
     * @private
     * @class Tag
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the tag. Need to specify:
     *     <ul>
     *         <li>properties.item.content.id : id of the tag.</li>
     *         <li>properties.item.content.title : the tag itself.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : a mandatory target for this tag. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb for this item (post) -- set it to properly to tag or untag</li>
     * </ul>
     * @constructor
     */
    init:function(){
        this._super();
        if(!(this.item.target.id && this.item.target.type)){
            throw {name : "Invalid Tag exception", error:"Tag needs a valid target"}
        }
        if(!(this.item.content && this.item.content.id && this.item.content.title)){
            throw {name : "Invalid Tag exception", error:"Tag needs a title and an id"}
        }
        this.item.type = cons.TYPE_TAG;
    }
    ,renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/tag.xml', { tag: this.item.content }, callback)
    }
});

var Like = ActivityObject.extend({
    /**
     * Like/Unlike.
     * @extends ActivityObject
     * @class Like
     * @private
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the like. Need to specify:
     *     <ul>
     *         <li>properties.item.content.id : id of the like.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : a mandatory target for the like. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb for this item (post) -- set it to properly to like or unlike</li>
     * </ul>
     * @constructor
     */
    init:function(){
        this._super();
        if(!(this.item.target.id && this.item.target.type)){
            throw {name : "Invalid Like exception", error:"Like needs a valid target"}
        }
        if(!(this.item.content && this.item.content.id)){
            throw {name : "Invalid Like Exception", error:"Like needs an id"}
        }
        this.item.type = cons.TYPE_LIKE;
    }
    ,renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/like.xml', { like: this.item.content }, callback)
    }
});

var Flag = ActivityObject.extend({
    /**
     * Flag/Unflag.
     * @class Flag
     * @private
     * @extends ActivityObject
     * @param {object} properties Specify:
     * <ul>
     *     <li>properties.item.content : the flag. Need to specify:
     *     <ul>
     *         <li>properties.item.content.id : id of the flag.</li>
     *     </ul></li>
     *     <li>properties.item.user : user posting that item.</li>
     *     <li>properties.item.target : a mandatory target for the flag. Specify
     *     <ul>
     *         <li>properties.item.target.id : the permalink of the target</li>
     *         <li>properties.item.type : the type of the target</li>
     *     </ul></li>
     *     <li>properties.item.feed : the feed this item is posted to.</li>
     *     <li>properties.item.verb : (optional) overwrite default verb for this item (post) -- set it to properly to flag or unflag</li>
     * </ul>
     * @constructor
     */
    init:function(){
        this._super();
        if(!(this.item.target.id && this.item.target.type)){
            throw {name : "Invalid Flag exception", error:"Flag needs a valid target"}
        }
        this.item.type = cons.TYPE_FLAG;
    }
    ,renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/flag.xml', { flag: this.item.content }, callback)
    }
});


// Expose everything
exports.Article = Article;
exports.Comment = Comment;
exports.Note = Note;
exports.Status = Status;

exports.Tag = Tag;
exports.Flag = Flag;
exports.Like = Like;

// For test only, end-user shouldn't need that
exports.ActivityObject = ActivityObject;