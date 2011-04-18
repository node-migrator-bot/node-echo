//Load dependencies
if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var utils = require("./utils.js");
var render = require("./render.js").Render;

var ActivityObject = Class.extend({
    /**
     * Parent class to define  all the Activity Objects Echo deals with, and their method for XML rendering.
     * http://wiki.aboutecho.com/w/page/24780107/How%20To%20-%20Getting%20us%20your%20Firehose#Supportedactivityobjecttypes
     * @submodule ActivityObject
     * @class ActivityObject
     */
     // Common to all Items:
     renderPost: function(callback){
        /**
         * Prepare an article for posting.
         * @method renderPost
         * @param {function} callback callback (should very likely be a call to a "submit" method)
         */

        self = this;
        this.renderItem(function(err,renderedData){
           var date = utils.ISODateString(new Date());
           render.renderTemplate(
              __dirname + '/templates/base.xml', // First arg of render.renderTemplate
              {                                  // Second arg
                 verb: 'http://activitystrea.ms/schema/1.0/post',
                 feed: {
                    idUrl: self.feed,
                    updated: date
                 },
                 entry: {
                    id: self.item.id,
                    published: date
                 },
                 actor: {
                     url: self.user.id
                    ,name: self.user.name
                    ,avatar: self.user.avatarURL
                 },
                 activityObject: renderedData,
                 target: {
                     type: self.item.type
                    ,url: self.item.url
                 }
              },
              function(error,renderedMessage){ // Third arg of render.renderTemplate
                 if(error)callback(error,"");
                 else{
                    callback("",{ content: renderedMessage })
                 }
              });
           }
        )
    }
     // Common to all Items:
    ,renderUpdate: function(update,callback){
        /**
         * Prepare the item for an update (tag / mark)
         * @method renderUpdate
         * @param {Object} update type and content of the update.
         * <ul>
         *     <li>update.type in {tag,untag,mark,unmark}</li>
         *     <li>update.content.id : id of the update</li>
         *     <li>update.content.title : title/content of the update</li>
         * </ul>
         * @param {function} callback callback that will be called with the rendered update.
         */
        if (!update){
            callback({name: "Illegal update exception",error:"Not recognized as a valid update"},"")
        } else {
            var verb;
            var template;
            var toBeRendered; // The object that will be rendered
            switch(update.type){
                // Echo documentation seems to be outdated and is messy. Might have to fix the "verb"s and the template.
                case "tag":
                    template = '/templates/tag.xml';
                    verb = 'http://activitystrea.ms/schema/1.0/tag';
                    toBeRendered = { tag : update.content};
                    break;
                case "untag":
                    template = '/templates/tag.xml';
                    verb = 'http://js-kit.com/spec/e2/v1/untag';
                    toBeRendered = { tag : update.content};
                    break;
                case "mark":
                    template = '/templates/marker.xml';
                    verb = 'http://js-kit.com/spec/e2/v1/marker';
                    toBeRendered = { marker : update.content};
                    break;
                case "unmark":
                    template = '/templates/marker.xml';
                    verb = 'http://js-kit.com/spec/e2/v1/untag';
                    toBeRendered = { marker : update.content};
                    break;
                case "like": // Case of like/flag : empty template, nothing to render !
                    template = '/templates/like.xml';
                    verb =  'http://activitystrea.ms/schema/1.0/like';
                    toBeRendered = { };
                    break;
                case "unlike":
                    template = '/templates/like.xml';
                    verb =  'http://js-kit.com/spec/e2/v1/unlike';
                    toBeRendered = { };
                    break;
                case "flag":
                    template = '/templates/flag.xml';
                    verb = 'http://activitystrea.ms/schema/1.0/flag';
                    toBeRendered = { };
                    break;
                case "unflag":
                    template = '/templates/flag.xml';
                    verb = 'http://js-kit.com/spec/e2/v1/unflag';
                    toBeRendered = { };
                    break;
                case "update":
                    // Just re-post the Item with updated values.
                    this.renderPost(callback);
                    break;
                default:
                    callback({name:"Illegal update exception", error:update.type+": not recognized as a valid update"},"")
            }

            var self = this;
            var date = utils.ISODateString(new Date());
            // Rendering
            render.renderTemplate(__dirname + template, toBeRendered, function(error,renderedUpdate){
                if(error)callback(error,"");
                else{
                    render.renderTemplate(__dirname + '/templates/base.xml', {
                        verb: verb,
                        feed: {
                            idUrl: self.feed,
                            updated: date
                        },
                        entry: {
                            id: self.item.id,
                            published: date
                        },
                        actor: {
                            url: self.user.id
                            ,name: self.user.name
                            ,avatar: self.user.avatarURL
                        },
                        activityObject: renderedUpdate,
                        target: {
                            type: self.item.type,
                            url: self.item.url
                        }
                    }, function(error,renderedMessage){
                        if(error)callback(error,"");
                        else{
                           callback("",{ content: renderedMessage })
                        }
                    });
                }
            });
        }
    }
     // Must be extended:
    ,init: function(){
        if (!(this.user && this.user.id && this.user.avatarURL && this.user.name)){
            throw {name :"Invalid user exception", error : "Invalid user"}
        }
        if (!(this.feed)){
            throw {name : "Invalid options exception", error :"Invalid feed"};
        }
        this.item.type = "abstract";
    } // Mostly common to all items, but must be extended
     // Must be overwritten:
    ,renderItem : function(callback){
        callback("","")
    } // Different for all items, must be extended

    // Properties (common to all Items):
    ,user:{
        enumerable: true
    }
    ,feed:{
        enumerable: false
    }
    ,item:{
        enumerable: true
    }
});



var Article = ActivityObject.extend({
    /**
     * @class Article
     * @constructor
     * @extends ActivityObject
     */
    init: function(){
        this._super();
        if (!(this.item && this.item.title && this.item.summary && this.item.content && this.item.permalink)){
            throw {name : "Invalid Article exception", error:"Article needs a title, a summary, a content an a permalink"}
        } else {
            this.item.id = this.item.permalink;
            this.item.summary = utils.Encoder.htmlEncode(this.item.summary,true);
            this.item.content = utils.Encoder.htmlEncode(this.item.content,true);
            this.item.title = utils.Encoder.htmlEncode(this.item.title,true);
            this.item.permalink = utils.Encoder.htmlEncode(this.item.permalink,true);
            this.item.url = this.item.permalink;
            this.item.type = "http://activitystrea.ms/schema/1.0/article"
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/article.xml', { article: this.item }, callback)
    }
});

var Comment = ActivityObject.extend({
    /**
     * @class Comment
     * @extends ActivityObject
     */
    init: function(){
        this._super();
        if (!(this.item && this.item.content && this.item.subject && this.item.permalink)){
            throw {name : "Invalid Comment exception", error:"Comment needs a subject, a content an a permalink"}
        } else {
            this.item.id = this.item.permalink;
            this.item.content = utils.Encoder.htmlEncode(this.item.content,true);
            this.item.subject = utils.Encoder.htmlEncode(this.item.subject,true);
            this.item.permalink = utils.Encoder.htmlEncode(this.item.permalink,true);
            this.item.type = "http://activitystrea.ms/schema/1.0/comment"
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/comment.xml', { comment: this.item }, callback)
    }
});

var Note = ActivityObject.extend({
    /**
     * @class Note
     * @extends ActivityObject
     * @constructor
     */
    init: function(){
        this._super();
        if (!(this.item && this.item.content && this.item.permalink)){
            throw {name : "Invalid Note exception", error:"Note needs a content an a permalink"}
        } else {
            this.item.id = this.item.permalink;
            this.item.content = utils.Encoder.htmlEncode(this.item.content,true);
            this.item.permalink = utils.Encoder.htmlEncode(this.item.permalink,true);
            this.item.type = "http://activitystrea.ms/schema/1.0/note"
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/note.xml', { note: this.item }, callback)
    }
});

// Interestingly, a "Status" is strictly equivalent to a "Note". But it's worth separating both objects.
var Status = ActivityObject.extend({
    /**
     * @class Status
     * @constructor
     * @extends ActivityObject
     */
    init: function(){
        this._super();
        if (!(this.item && this.item.content && this.item.permalink)){
            throw {name : "Invalid Status exception", error:"Status needs a content an a permalink"}
        } else {
            this.item.id = this.item.permalink;
            this.item.content = utils.Encoder.htmlEncode(this.item.content,true);
            this.item.permalink = utils.Encoder.htmlEncode(this.item.permalink,true);
            this.item.type = "http://activitystrea.ms/schema/1.0/status"
        }
    },
    renderItem : function(callback){
        render.renderTemplate(__dirname + '/templates/status.xml', { status: this.item }, callback)
    }
});

exports.Article = Article;
exports.Comment = Comment;
exports.Note = Note;
exports.Status = Status;

// For test only, end-user don't need that
exports.ActivityObject = ActivityObject;