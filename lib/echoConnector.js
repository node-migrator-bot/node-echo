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


/****************************************
 *            Search methods            *
 ****************************************/
EchoConnector.prototype.search = function(query,callback){
    /**
     * Search for query
     * @method search
     * @param {string} query Query to perform
     * @param {function} callback callback
     */
    this.itemsAPI.search(query,callback)
    
};

EchoConnector.prototype.count = function(query,callback){
    /**
     * Count how many answer match the query
     * @method count
     * @param {string} query Query to perform
     * @param {function} callback callback
     */
    this.itemsAPI.count(query,callback)
};

EchoConnector.prototype.mux = function(query,callback){
    /**
     * Perform multiple, parallel query
     * @method count
     * @param {string} query Array of queries (JSON object)
     * @param {function} callback callback
     */
    this.itemsAPI.mux(query,callback)
};

/******************************************************
 *                  Submit methods                    *
 ******************************************************/

/******************************************************
 *          Submit methods for item Article       
 */
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

EchoConnector.prototype.tagArticle = function(article,tag,user,callback){
    /**
     * Tag an article
     * @method tagArticle
     * @param {object} article Article to update. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} tag Tag to apply to the article. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "tag";
    update.content = tag;
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.untagArticle = function(article,tag,user,callback){
    /**
     * remove a tag on an article
     * @method untagArticle
     * @param {object} article Article to untag. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} tag Tag to remove from the article. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that tag</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "untag";
    update.content = tag;
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.markArticle = function(article,mark,user,callback){
    /**
     * Add a mark to an article
     * @method markArticle
     * @param {object} article Article to mark. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} mark Marker to apply to the article. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "mark";
    update.content = mark;
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unmarkArticle = function(article,mark,user,callback){
    /**
     * Remove a mark from an article
     * @method unmarkArticle
     * @param {object} article Article to unmark. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} mark Marker to remove from the article. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "unmark";
    update.content = mark;
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.likeArticle = function(article,user,callback){
    /**
     * Allow a user to "like" an article
     * @method likeArticle
     * @param {object} article Article to like. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "like";
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unlikeArticle = function(article,user,callback){
    /**
     * Allow a user to remove a previous "like" to an article
     * @method unlikeArticle
     * @param {object} article Article to unlike. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "unlike";
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.flagArticle = function(article,user,callback){
    /**
     * Allow a user to flag an article (for example : offensive article)
     * @method flagArticle
     * @param {object} article Article to flag. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "flag";
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unflagArticle = function(article,user,callback){
    /**
     * Allow a user to unflag an article (for example : offensive article)
     * @method unflagArticle
     * @param {object} article Article to unflag. Need to specify:
     * <ul>
     *     <li>article.permalink : reference to the existing article</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var article_ = article;
    article_.content = "";
    article_.title = "";
    article_.summary = "";

    var update = {};
    update.type = "unflag";
    var myArticle = activityObjects.Article.spawn({item:article_, user:user, feed:this.feed});
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateArticle = function(article,user,callback){
    /**
     * Allow a user to update an article
     * @method updateArticle
     * @param {object} article Article to be updated. Need to specify:
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
    update = {};
    update.type = 'update';
    // Rendering article then post it.
    myArticle.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


/******************************************************
 *          Submit methods for item Comment           *
 */
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


EchoConnector.prototype.tagComment = function(comment,tag,user,callback){
    /**
     * Tag an comment
     * @method tagComment
     * @param {object} comment Comment to update. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} tag Tag to apply to the comment. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "tag";
    update.content = tag;
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.untagComment = function(comment,tag,user,callback){
    /**
     * remove a tag on an comment
     * @method untagComment
     * @param {object} comment Comment to untag. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} tag Tag to remove from the comment. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that tag</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "untag";
    update.content = tag;
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.markComment = function(comment,mark,user,callback){
    /**
     * Add a mark to an comment
     * @method markComment
     * @param {object} comment Comment to mark. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} mark Marker to apply to the comment. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "mark";
    update.content = mark;
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unmarkComment = function(comment,mark,user,callback){
    /**
     * Remove a mark from an comment
     * @method unmarkComment
     * @param {object} comment Comment to unmark. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} mark Marker to remove from the comment. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "unmark";
    update.content = mark;
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.likeComment = function(comment,user,callback){
    /**
     * Allow a user to "like" an comment
     * @method likeComment
     * @param {object} comment Comment to like. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "like";
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unlikeComment = function(comment,user,callback){
    /**
     * Allow a user to remove a previous "like" to an comment
     * @method unlikeComment
     * @param {object} comment Comment to unlike. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "unlike";
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.flagComment = function(comment,user,callback){
    /**
     * Allow a user to flag an comment (for example : offensive comment)
     * @method flagComment
     * @param {object} comment Comment to flag. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "flag";
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unflagComment = function(comment,user,callback){
    /**
     * Allow a user to unflag an comment (for example : offensive comment)
     * @method unflagComment
     * @param {object} comment Comment to unflag. Need to specify:
     * <ul>
     *     <li>comment.permalink : reference to the existing comment</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var comment_ = comment;
    comment_.content = "";
    comment_.title = "";
    comment_.summary = "";

    var update = {};
    update.type = "unflag";
    var myComment = activityObjects.Comment.spawn({item:comment_, user:user, feed:this.feed});
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateComment = function(comment,user,callback){
    /**
     * Allow a user to update an comment
     * @method updateComment
     * @param {object} comment Comment to be updated. Need to specify:
     * <ul>
     *     <li>comment.title : title of the comment</li>
     *     <li>comment.summary : a short summary. </li>
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
    update = {};
    update.type = 'update';
    // Rendering comment then post it.
    myComment.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


/******************************************************
 *          Submit methods for item Note              *
 */
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

EchoConnector.prototype.tagNote = function(note,tag,user,callback){
    /**
     * Tag an note
     * @method tagNote
     * @param {object} note Note to update. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} tag Tag to apply to the note. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "tag";
    update.content = tag;
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.untagNote = function(note,tag,user,callback){
    /**
     * remove a tag on an note
     * @method untagNote
     * @param {object} note Note to untag. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} tag Tag to remove from the note. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that tag</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "untag";
    update.content = tag;
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.markNote = function(note,mark,user,callback){
    /**
     * Add a mark to an note
     * @method markNote
     * @param {object} note Note to mark. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} mark Marker to apply to the note. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "mark";
    update.content = mark;
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unmarkNote = function(note,mark,user,callback){
    /**
     * Remove a mark from an note
     * @method unmarkNote
     * @param {object} note Note to unmark. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} mark Marker to remove from the note. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "unmark";
    update.content = mark;
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.likeNote = function(note,user,callback){
    /**
     * Allow a user to "like" an note
     * @method likeNote
     * @param {object} note Note to like. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "like";
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unlikeNote = function(note,user,callback){
    /**
     * Allow a user to remove a previous "like" to an note
     * @method unlikeNote
     * @param {object} note Note to unlike. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "unlike";
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.flagNote = function(note,user,callback){
    /**
     * Allow a user to flag an note (for example : offensive note)
     * @method flagNote
     * @param {object} note Note to flag. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "flag";
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unflagNote = function(note,user,callback){
    /**
     * Allow a user to unflag an note (for example : offensive note)
     * @method unflagNote
     * @param {object} note Note to unflag. Need to specify:
     * <ul>
     *     <li>note.permalink : reference to the existing note</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var note_ = note;
    note_.content = "";
    note_.title = "";
    note_.summary = "";

    var update = {};
    update.type = "unflag";
    var myNote = activityObjects.Note.spawn({item:note_, user:user, feed:this.feed});
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateNote = function(note,user,callback){
    /**
     * Allow a user to update an note
     * @method updateNote
     * @param {object} note Note to be updated. Need to specify:
     * <ul>
     *     <li>note.title : title of the note</li>
     *     <li>note.summary : a short summary. </li>
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
    update = {};
    update.type = 'update';
    // Rendering note then post it.
    myNote.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};




/******************************************************
 *          Submit methods for item Status            *
 */
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

EchoConnector.prototype.tagStatus = function(status,tag,user,callback){
    /**
     * Tag an status
     * @method tagStatus
     * @param {object} status Status to update. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} tag Tag to apply to the status. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "tag";
    update.content = tag;
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.untagStatus = function(status,tag,user,callback){
    /**
     * remove a tag on an status
     * @method untagStatus
     * @param {object} status Status to untag. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} tag Tag to remove from the status. Need to specify:
     * <ul>
     *     <li>tag.title : title/content of your tag/mark</li>
     *     <li>tag.id : id for that tag</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "untag";
    update.content = tag;
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.markStatus = function(status,mark,user,callback){
    /**
     * Add a mark to an status
     * @method markStatus
     * @param {object} status Status to mark. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} mark Marker to apply to the status. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "mark";
    update.content = mark;
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unmarkStatus = function(status,mark,user,callback){
    /**
     * Remove a mark from an status
     * @method unmarkStatus
     * @param {object} status Status to unmark. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} mark Marker to remove from the status. Need to specify:
     * <ul>
     *     <li>marker.title : title/content of your tag/mark</li>
     *     <li>marker.id : id for that update</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "unmark";
    update.content = mark;
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.likeStatus = function(status,user,callback){
    /**
     * Allow a user to "like" an status
     * @method likeStatus
     * @param {object} status Status to like. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "like";
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unlikeStatus = function(status,user,callback){
    /**
     * Allow a user to remove a previous "like" to an status
     * @method unlikeStatus
     * @param {object} status Status to unlike. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "unlike";
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.flagStatus = function(status,user,callback){
    /**
     * Allow a user to flag an status (for example : offensive status)
     * @method flagStatus
     * @param {object} status Status to flag. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "flag";
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.unflagStatus = function(status,user,callback){
    /**
     * Allow a user to unflag an status (for example : offensive status)
     * @method unflagStatus
     * @param {object} status Status to unflag. Need to specify:
     * <ul>
     *     <li>status.permalink : reference to the existing status</li>
     * </ul>
     * @param {object} user User submitting the update
     * @param {function} callback callback called after submission
     */
    var status_ = status;
    status_.content = "";
    status_.title = "";
    status_.summary = "";

    var update = {};
    update.type = "unflag";
    var myStatus = activityObjects.Status.spawn({item:status_, user:user, feed:this.feed});
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};

EchoConnector.prototype.updateStatus = function(status,user,callback){
    /**
     * Allow a user to update an status
     * @method updateStatus
     * @param {object} status Status to be updated. Need to specify:
     * <ul>
     *     <li>status.title : title of the status</li>
     *     <li>status.summary : a short summary. </li>
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
    update = {};
    update.type = 'update';
    // Rendering status then post it.
    myStatus.renderUpdate(update,function(err,data){
        this.itemsAPI.submit(err,data,callback);
    })
};


// Expose the EchoConnector class
exports.EchoConnector = EchoConnector;

//That's all folks
