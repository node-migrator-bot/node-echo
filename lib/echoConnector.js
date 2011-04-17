/**
 * Glue all the different modules together and expose them to the user in a convenient way.
 * Basically : give you access to all the things you can do with Echo.
 * @module echo
 */

var activityObjects = require("./activityObjects.js");
var ItemsAPI = require("./itemsAPI.js").ItemsAPI;

var EchoConnector = function(consumerKey, consumerSecret, feed){
    /**
     * @class EchoConnector
     * @param {string} consumerKey your Echo API key
     * @param {string} consumerSecret your Echo API secret
     * @param {string} feed the feed you want to interact wth (retrieve from/post to)
     */
    if (!(consumerKey && consumerSecret && feed)) {
      throw {name:"Invalid initialisation exception", error : "Specify API Key, secret and feed"}
    }  else {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.feed = feed
    }
    this.itemsAPI = new ItemsAPI({consumerKey:this.consumerKey,consumerSecret:this.consumerSecret});
};


EchoConnector.prototype.submitArticle = function(article,user,callback){
    /**
     * Submit an article (typically : a blog entry)
     * @method submitArticle
     * @param {object} article Article to be submitted. Need to specify:
     * <ul>
     *     <li>article.title : title of the article</li>
     *     <li>article.summary : a short summary. </li>
     *     <li>article.content : main content of the article</li>
     *     <li>article.permalink : permanent link for this article</li>
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
    var myArticle = activityObjects.Article.spawn({item:article, user:user, feed:this.feed});

    // Rendering article then post it.
    myArticle.renderPost(function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateArticle = function(article,update,user,callback){
    /**
     * Tag/Mark/Untag,Unmark or update properties of an article
     * @method updateArticle
     * @param {object} article Article to update. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} update Update to apply to the article. Need to specify:
     * <ul>
     *     <li>update.type : in {tag,untag,mark,unmark}</li>
     *     <li>update.content.title : title/content of your tag/mark</li>
     *     <li>update.content.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});

    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


EchoConnector.prototype.submitComment = function(comment,user,callback){
    /**
     * Submit a comment (typically : a response related to a blog entry)
     * @method submitComment
     * @param {object} comment Comment to be submitted. Need to specify:
     * <ul>
     *     <li>comment.subject : subject of the comment</li>
     *     <li>comment.content : main content of the comment</li>
     *     <li>comment.permalink : permanent link for this comment</li>
     * </ul>
     * @param {object} user user submitting the content. Need to specify:
     * <ul>
     *     <li>user.id : unique id for this user</li>
     *     <li>user.name : name of the user</li>
     *     <li>user.avatarURL : avatar of the user</li>
     * </ul>
     * @param {function} callback callback called after submission

     */
    // Creating comment
    var myComment = activityObjects.Comment.spawn({item:comment, user:user, feed:this.feed});

    // Rendering article then post it.
    myComment.renderPost(function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateComment = function(comment,update,user,callback){
    /**
     * Tag/Mark/Untag,Unmark or update properties of a comment
     * @method updateComment
     * @param {object} comment Comment to update. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} update Update to apply to the comment. Need to specify:
     * <ul>
     *     <li>update.type : in {tag,untag,mark,unmark}</li>
     *     <li>update.content.title : title/content of the tag/mark</li>
     *     <li>update.content.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.subject = "";
    comment_.content = "";
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});

    // Rendering comment & tag then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


EchoConnector.prototype.submitNote = function(note,user,callback){
    /**
     * Submit a note
     * @method submitNote
     * @param {object} note Note to be submitted. Need to specify:
     * <ul>
     *     <li>note.content : main content of the note</li>
     *     <li>note.permalink : permanent link for this note</li>
     * </ul>
     * @param {object} user user submitting the content. Need to specify:
     * <ul>
     *     <li>user.id : unique id for this user</li>
     *     <li>user.name : name of the user</li>
     *     <li>user.avatarURL : avatar of the user</li>
     * </ul>
     * @param {function} callback callback called after submission
     */
    // Creating note
    var myNote = activityObjects.Note.spawn({item:note, user:user, feed:this.feed});

    // Rendering note then post it.
    myNote.renderPost(function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateNote = function(note,update,user,callback){
    /**
     * Tag/Mark/Untag,Unmark or update properties of a note
     * @method updateNote
     * @param {object} note Note to update. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} update Update to apply to the note. Need to specify:
     * <ul>
     *     <li>update.type : in {tag,untag,mark,unmark}</li>
     *     <li>update.content.title : title/content of the tag/mark</li>
     *     <li>update.content.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});

    // Rendering comment & tag then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.submitStatus = function(status,user,callback){
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
    var myStatus = activityObjects.Status.spawn({item:status, user:user, feed:this.feed});

    // Rendering article then post it.
    myStatus.renderPost(function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateStatus = function(status,update,user,callback){
    /**
     * Tag/Mark/Untag,Unmark or update properties of a status
     * @method updateStatus
     * @param {object} status Status to update. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} update Update to apply to the status. Need to specify:
     * <ul>
     *     <li>update.type : in {tag,untag,mark,unmark}</li>
     *     <li>update.content.title : title/content of the tag/mark</li>
     *     <li>update.content.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status.content = "";
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});

    // Rendering comment & tag then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


EchoConnector.prototype.like = function(like,item){

};

EchoConnector.prototype.unLike = function(like,item){

};

EchoConnector.prototype.flag = function(flag,item){

};

EchoConnector.prototype.unFlag = function(flag,item){
    
};

EchoConnector.prototype.search = function(query){

};

EchoConnector.prototype.count = function(query){

}

// Expose the EchoConnector class
exports.EchoConnector = EchoConnector;
