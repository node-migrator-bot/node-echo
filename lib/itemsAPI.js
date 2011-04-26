if(typeof Class === 'undefined') Class = require('./Class.js').Class;
var activityObjects = require("./activityObjects.js");
var ItemsAPICore = require("./ItemsAPICore.js").ItemsAPICore;
var cons = require("./Const.js");


var ItemsAPI = Class.extend({
     parameters:{
         enumerable:true
     }
     ,init:function(){
         /**
          * Gives access to all the things you can do with the items API of Echo.
          * @class ItemsAPI
          * @submodule ItemsAPI
          * @constructor
          * @param {object} parameters Options, need to specify:
          * <ul>
          *     <li>parameters.consumerKey : Echo API Key</li>
          *     <li>parameters.consumerSecret : Echo API Secret</li>
          *     <li>parameters.feed : Feed to communicate with
          *     <li>parameters.authMethod : optional, in ['oauth','basic']. Default 'oauth'
          * </ul>
          */
         if (!(this.parameters.consumerKey && this.parameters.consumerSecret && this.parameters.feed)) {
           throw {name:"Invalid initialisation exception", error : "Specify API Key, secret and feed"}
         } else {
             if (!(this.parameters.authMethod)){
                 this.parameters.authMethod = "oauth";
             }
             this.itemsAPICore = ItemsAPICore.spawn({parameters:{consumerKey:this.parameters.consumerKey,consumerSecret:this.parameters.consumerSecret, authMethod:this.parameters.authMethod}});

         }
     }
    /* **************************************
     *            Search                    *
     ************************************** */

    ,search: function(query,callback){
        /**
         * Search for query
         * @method search
         * @param {string} query Query to submit
         * @param {function} callback callback
         */
        this.itemsAPICore.search(query,callback)
    }
    ,count: function(query,callback){
        /**
         * Count how many answers match the query
         * @method count
         * @param {string} query Query to submit
         * @param {function} callback callback
         */
        this.itemsAPICore.count(query,callback)
    }
    ,mux: function(query,callback){
        /**
         * Perform multiple, parallel query
         * @method mux
         * @param {string} query Array of queries (JSON object)
         * @param {function} callback callback
         */
        this.itemsAPICore.mux(query,callback)
    }

    /* ************************************************* *
     *                      Verbs                        *
     * ************************************************* */
    ,tag: function(target,tag,user,callback){
        /**
         * Tag an item
         * @method tag
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {object} tag Tag to apply to the article. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_TAG
            ,feed:this.parameters.feed
            ,content:tag
            ,user:user
        };
        var myTag = activityObjects.Tag.spawn({item:item});

        // Rendering article then post it.
        myTag.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,untag: function(target,tag,user,callback){
        /**
         * unTag an item
         * @method untag
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {object} tag Tag to apply to the article. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_UNTAG
            ,feed:this.parameters.feed
            ,content:tag
            ,user:user
        };
        var myTag = activityObjects.Tag.spawn({item:item});

        // Rendering article then post it.
        myTag.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,like: function(target,like,user,callback){
        /**
         * Allow a user to "like" an item
         * @method like
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_LIKE
            ,feed:this.parameters.feed
            ,content:like
            ,user:user
        };
        var myLike = activityObjects.Like.spawn({item:item});

        // Rendering article then post it.
        myLike.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,unlike: function(target,like,user,callback){
        /**
         * Allow a user to "like" an item
         * @method like
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_UNLIKE
            ,feed:this.parameters.feed
            ,content:like
            ,user:user
        };
        var myLike = activityObjects.Like.spawn({item:item});

        // Rendering article then post it.
        myLike.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,flag: function(target,flag,user,callback){
        /**
         * "flag" an item
         * @method flag
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that flag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_FLAG
            ,feed:this.parameters.feed
            ,content:flag
            ,user:user
        };
        var myFlag = activityObjects.Flag.spawn({item:item});

        // Rendering article then post it.
        myFlag.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,unflag: function(target,flag,user,callback){
        /**
         * "unflag" an item
         * @method unflag
         * @param {object} target Target of the action. Specify:
         * <ul>
         *     <li>target.type: type of the target</li>
         *     <li>target.id : id of the target</li>
         * </ul>
         * @param {string} target Id of the article to like
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that flag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        var self = this;
        var item =  {
            target:target
            ,verb:cons.VERB_UNFLAG
            ,feed:this.parameters.feed
            ,content:flag
            ,user:user
        };
        var myFlag = activityObjects.Flag.spawn({item:item});

        // Rendering article then post it.
        myFlag.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }

    /* *************************************************** *
     *                  Submit                             *
     * *************************************************** */
    ,submitArticle: function(article,user,callback){
        /**
         * Submit an article (typically : a blog entry)
         * @method submitArticle
         * @param {object} article Article to be submitted. Need to specify:
         * <ul>
         *     <li>article.content : The content of the article, specify:</li>
         *     <ul>
         *         <li>article.content.title : title of the article</li>
         *         <li>article.content.summary : a short summary. </li>
         *         <li>article.content.content : main content of the article</li>
         *         <li>article.content.permalink : permanent link for this article</li>
         *     </ul>
         *     <li>article.target : (optional) target of the article. Specify:</li>
         *     <ul>
         *         <li>article.target.type : type of the target</li>
         *         <li>article.target.id : id of the target</li>
         *     </ul>
         * </ul>
         * @param {object} user user submitting the content. Need to specify:
         * <ul>
         *     <li>user.id : unique id for this user</li>
         *     <li>user.name : name of the user</li>
         *     <li>user.avatarURL : avatar of the user</li>
         * </ul>
         * @param {function} callback callback called after submission
         */
        // Creating article
        var self = this;
        article.feed = this.parameters.feed;
        article.user = user;
        var myArticle = activityObjects.Article.spawn({item:article});
        // Rendering article then post it.
        myArticle.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,submitComment: function(comment,user,callback){
        /**
         * Submit a comment
         * @method submitComment
         * @param {object} comment Comment to be submitted. Need to specify:
         * <ul>
         *     <li>comment.content. Specify:</li>
         *     <ul>
         *         <li>comment.content.subject : subject of the comment (can be blank, must be defined)</li>
         *         <li>comment.content.content : main content of the comment</li>
         *         <li>comment.content.permalink : permanent link for this comment</li>
         *     <ul>
         *     <li>comment.target : (optional) target of this comment. Specify:</li>
         *     <ul>
         *         <li>comment.target.id : ID of the target</li>
         *         <li>comment.target.type : type of the target</li>
         *     </ul>
         * </ul>
         * @param {object} user user submitting the content. Need to specify:
         * <ul>
         *     <li>user.id : unique id for this user</li>
         *     <li>user.name : name of the user</li>
         *     <li>user.avatarURL : avatar of the user</li>
         * </ul>
         * @param {function} callback callback called after submission

         */
        var self = this;
        // Creating comment
        comment.feed = this.parameters.feed;
        comment.user = user;
        var myComment = activityObjects.Comment.spawn({item:comment});
        // Rendering comment then post it.
        myComment.renderPost(function(err,data){
//            console.log(data)
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,submitNote: function(note,user,callback){
        /**
         * Submit a note
         * @method submitNote
         * @param {object} note Note to be submitted. Need to specify:
         * <ul>
         *     <li>note.content. Specify:</li>
         *     <ul>
         *         <li>note.content.content : main content of the note</li>
         *         <li>note.content.permalink : permanent link for this note</li>
         *     <ul>
         *     <li>note.target : (optional) target of this note. Specify:</li>
         *     <ul>
         *         <li>note.target.id : ID of the target</li>
         *         <li>note.target.type : type of the target</li>
         *     </ul>
         * </ul>
         * @param {object} user user submitting the content. Need to specify:
         * <ul>
         *     <li>user.id : unique id for this user</li>
         *     <li>user.name : name of the user</li>
         *     <li>user.avatarURL : avatar of the user</li>
         * </ul>
         * @param {function} callback callback called after submission

         */
        var self = this;
        // Creating note
        note.feed = this.parameters.feed;
        note.user = user;
        var myNote = activityObjects.Note.spawn({item:note});
        // Rendering note then post it.
        myNote.renderPost(function(err,data){
//            console.log(data)
            self.itemsAPICore.submit(err,data,callback);
        })
    }
    ,submitStatus: function(status,user,callback){
        /**
         * Submit a status
         * @method submitStatus
         * @param {object} status Status to be submitted. Need to specify:
         * <ul>
         *     <li>status.content : main content of the status</li>
         *     <li>status.permalink : permanent link for this status</li>
         * </ul>
         * @param {object} user user submitting the content. Need to specify:
         * <ul>
         *     <li>user.id : unique id for this user</li>
         *     <li>user.name : name of the user</li>
         *     <li>user.avatarURL : avatar of the user</li>
         * </ul>
         * @param {function} callback callback called after submission
         */
        // Creating status
        status.feed = this.parameters.feed;
        status.user = user;

        var myStatus = activityObjects.Status.spawn({item:status});
        var self = this;
        // Rendering article then post it.
        myStatus.renderPost(function(err,data){
            self.itemsAPICore.submit(err,data,callback);
        })
    }


    /* **********************************************
     *    Aliases for everybody                     *
     * **********************************************/
    ,tagArticle: function(target,tag,user,callback){
        /**
         * Tag an article
         * @method tagArticle
         * @param {string} target ID of the article
         * @param {object} tag Tag to apply to the article. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.tag({id:target,type:cons.TYPE_ARTICLE},tag,user,callback)
    }
    ,untagArticle: function(target,tag,user,callback){
        /**
         * remove a tag on an article
         * @method untagArticle
         * @param {string} target ID of the article
         * @param {object} tag Tag to remove from the article. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that tag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.untag({id:target,type:cons.TYPE_ARTICLE},tag,user,callback)
    }
    ,likeArticle: function(target,like,user,callback){
        /**
         * Allow a user to "like" an article
         * @method likeArticle
         * @param {string} target Id of the article
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.like({id:target,type:cons.TYPE_ARTICLE},like,user,callback)
    }
    ,unlikeArticle: function(target,like,user,callback){
        /**
         * Allow a user to "like" an article
         * @method unlikeArticle
         * @param {string} target Id of the article
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.unlike({id:target,type:cons.TYPE_ARTICLE},like,user,callback)
    }
    ,flagArticle: function(target,flag,user,callback){
        /**
         * Allow a user to "flag" an article
         * @method flagArticle
         * @param {string} target Id of the article
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_ARTICLE},flag,user,callback)
    }
    ,unflagArticle: function(target,flag,user,callback){
        /**
         * "unflag" an article
         * @method unflagArticle
         * @param {string} target Id of the article
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "flag"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_ARTICLE},flag,user,callback)
    }
        ,tagComment: function(target,tag,user,callback){
        /**
         * Tag an comment
         * @method tagComment
         * @param {string} target ID of the comment
         * @param {object} tag Tag to apply to the comment. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.tag({id:target,type:cons.TYPE_COMMENT},tag,user,callback)
    }
    ,untagComment: function(target,tag,user,callback){
        /**
         * remove a tag on an comment
         * @method untagComment
         * @param {string} target ID of the comment
         * @param {object} tag Tag to remove from the comment. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that tag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.untag({id:target,type:cons.TYPE_COMMENT},tag,user,callback)
    }
    ,likeComment: function(target,like,user,callback){
        /**
         * Allow a user to "like" an comment
         * @method unlikeComment
         * @param {string} target Id of the comment
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.like({id:target,type:cons.TYPE_COMMENT},like,user,callback)
    }
    ,unlikeComment: function(target,like,user,callback){
        /**
         * Allow a user to "like" an comment
         * @method likeComment
         * @param {string} target Id of the comment
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.unlike({id:target,type:cons.TYPE_COMMENT},like,user,callback)
    }
    ,flagComment: function(target,flag,user,callback){
        /**
         * Allow a user to "flag" an comment
         * @method flagComment
         * @param {string} target Id of the comment
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_COMMENT},flag,user,callback)
    }
    ,unflagComment: function(target,flag,user,callback){
        /**
         * "unflag" an comment
         * @method unflagComment
         * @param {string} target Id of the comment
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "flag"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_COMMENT},flag,user,callback)
    }
    ,tagNote: function(target,tag,user,callback){
        /**
         * Tag an note
         * @method tagNote
         * @param {string} target ID of the note
         * @param {object} tag Tag to apply to the note. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.tag({id:target,type:cons.TYPE_NOTE},tag,user,callback)
    }
    ,untagNote: function(target,tag,user,callback){
        /**
         * remove a tag on an note
         * @method untagNote
         * @param {string} target ID of the note
         * @param {object} tag Tag to remove from the note. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that tag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.untag({id:target,type:cons.TYPE_NOTE},tag,user,callback)
    }
    ,likeNote: function(target,like,user,callback){
        /**
         * Allow a user to "like" an note
         * @method likeNote
         * @param {string} target Id of the note
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.like({id:target,type:cons.TYPE_NOTE},like,user,callback)
    }
    ,unlikeNote: function(target,like,user,callback){
        /**
         * Allow a user to "like" an note
         * @method unlikeNote
         * @param {string} target Id of the note
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.unlike({id:target,type:cons.TYPE_NOTE},like,user,callback)
    }
    ,flagNote: function(target,flag,user,callback){
        /**
         * Allow a user to "flag" an note
         * @method flagNote
         * @param {string} target Id of the note
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_NOTE},flag,user,callback)
    }
    ,unflagNote: function(target,flag,user,callback){
        /**
         * "unflag" an note
         * @method unflagNote
         * @param {string} target Id of the note
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "flag"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_NOTE},flag,user,callback)
    }
        ,tagStatus: function(target,tag,user,callback){
        /**
         * Tag an status
         * @method tagStatus
         * @param {string} target ID of the status
         * @param {object} tag Tag to apply to the status. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that update</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.tag({id:target,type:cons.TYPE_STATUS},tag,user,callback)
    }
    ,untagStatus: function(target,tag,user,callback){
        /**
         * remove a tag on an status
         * @method untagStatus
         * @param {string} target ID of the status
         * @param {object} tag Tag to remove from the status. Need to specify:
         * <ul>
         *     <li>tag.title : title/content of your tag/mark</li>
         *     <li>tag.id : id for that tag</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.untag({id:target,type:cons.TYPE_STATUS},tag,user,callback)
    }
    ,likeStatus: function(target,like,user,callback){
        /**
         * Allow a user to "like" an status
         * @method unlikeStatus
         * @param {string} target Id of the status
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.like({id:target,type:cons.TYPE_STATUS},like,user,callback)
    }
    ,unlikeStatus: function(target,like,user,callback){
        /**
         * Allow a user to "like" an status
         * @method likeStatus
         * @param {string} target Id of the status
         * @param {object} like like object. Specify
         * <ul>
         *     <li>tag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.unlike({id:target,type:cons.TYPE_STATUS},like,user,callback)
    }
    ,flagStatus: function(target,flag,user,callback){
        /**
         * Allow a user to "flag" an status
         * @method flagStatus
         * @param {string} target Id of the status
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "like"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_STATUS},flag,user,callback)
    }
    ,unflagStatus: function(target,flag,user,callback){
        /**
         * "unflag" an status
         * @method unflagStatus
         * @param {string} target Id of the status
         * @param {object} flag flag object. Specify
         * <ul>
         *     <li>flag.id : id for that "flag"</li>
         * </ul>
         * @param {object} user User submitting the update
         * @param {function} callback callback called after submission
         */
        this.flag({id:target,type:cons.TYPE_STATUS},flag,user,callback)
    }
});

// Expose the ItemsAPI class
exports.ItemsAPI = ItemsAPI;

//That's all folks