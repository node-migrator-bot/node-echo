var ItemsAPI = require("itemsAPI.js").ItemsAPI; // Object
var activityObjects = require("activityObjects.js");
var itemsAPI ; // Instance of ItemsAPI;
var callback;
var MockItem;
describe("itemsAPI",function(){
    describe("valid options",function(){
        beforeEach(function(){
            itemsAPI = ItemsAPI.spawn({
                parameters:{
                    consumerKey:"Key"
                   ,consumerSecret:"Secret"
                   ,feed:"feed"
                }
            })
        });
        it("should be initialised",function(){
            expect(itemsAPI.parameters.feed).toEqual('feed');
            expect(itemsAPI.itemsAPICore).toBeDefined();
        });
        describe("search",function(){
            beforeEach(function(){
                callback = jasmine.createSpy();
                spyOn(itemsAPI.itemsAPICore,"search");
                itemsAPI.search("query",callback)
            });
            it("should have called itemsAPI.itemsAPICore.search",function(){
                expect(itemsAPI.itemsAPICore.search).toHaveBeenCalledWith("query",callback);
            })
        });
        describe("count",function(){
            beforeEach(function(){
                callback = jasmine.createSpy();
                spyOn(itemsAPI.itemsAPICore,"count");
                itemsAPI.count("query",callback)
            });
            it("should have called itemsAPI.itemsAPICore.count",function(){
                expect(itemsAPI.itemsAPICore.count).toHaveBeenCalledWith("query",callback);
            })
        });
        describe("mux",function(){
            beforeEach(function(){
                callback = jasmine.createSpy();
                spyOn(itemsAPI.itemsAPICore,"mux");
                itemsAPI.mux("query",callback)
            });
            it("should have called itemsAPI.itemsAPICore.mux",function(){
                expect(itemsAPI.itemsAPICore.mux).toHaveBeenCalledWith("query",callback);
            })
        });
        describe("Article actions",function(){
            beforeEach(function(){
                MockItem = activityObjects.Article.spawn({
                    item:{summary:"s",content:"c",title:"t",permalink:"p"},
                    user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                    feed:"feed"
                });
            });
            describe("submitArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderPost");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.submitArticle({summary:"s",content:"c",title:"t",permalink:"p"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);
                    
                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderPost.mostRecentCall.args[0];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for post",function(){
                    expect(MockItem.renderPost).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("tagArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.tagArticle({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("untagArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.untagArticle({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("markArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.markArticle({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unmarkArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unmarkArticle({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("likeArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.likeArticle({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unlikeArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unlikeArticle({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("flagArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.flagArticle({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unflagArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unflagArticle({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("updateArticle",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Article,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.updateArticle({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new article",function(){
                    expect(activityObjects.Article.spawn).toHaveBeenCalled();
                });
                it("should render the article for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedArticle",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
        });
        describe("Comment actions",function(){
            beforeEach(function(){
                MockItem = activityObjects.Comment.spawn({
                    item:{subject:"s",content:"c",permalink:"p"},
                    user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                    feed:"feed"
                });
            });
            describe("submitComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderPost");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.submitComment({summary:"s",content:"c",title:"t",permalink:"p"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);
                    
                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderPost.mostRecentCall.args[0];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for post",function(){
                    expect(MockItem.renderPost).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("tagComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.tagComment({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("untagComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.untagComment({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("markComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.markComment({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unmarkComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unmarkComment({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("likeComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.likeComment({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unlikeComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unlikeComment({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("flagComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.flagComment({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("unflagComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.unflagComment({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
            describe("updateComment",function(){
                beforeEach(function(){
                    spyOn(MockItem,"renderUpdate");
                    spyOn(activityObjects.Comment,"spawn").andReturn(MockItem);
                    callback = jasmine.createSpy();
                    itemsAPI.updateComment({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                    // Retrieve the callback of renderPost
                    var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                    // SpyOn what the callback is supposed to call
                    spyOn(itemsAPI.itemsAPICore,"submit");
                    // Call the callback
                    cb("err","data");
                });
                it("should spawn a new Comment",function(){
                    expect(activityObjects.Comment.spawn).toHaveBeenCalled();
                });
                it("should render the Comment for update",function(){
                    expect(MockItem.renderUpdate).toHaveBeenCalled();
                });
                it("should submit the renderedComment",function(){
                    expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
                })
            });
        });
        describe("Note actions",function(){
           beforeEach(function(){
               MockItem = activityObjects.Note.spawn({
                   item:{content:"c",permalink:"p"},
                   user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                   feed:"feed"
               });
           });
           describe("submitNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderPost");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.submitNote({summary:"s",content:"c",title:"t",permalink:"p"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);
                    
                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderPost.mostRecentCall.args[0];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for post",function(){
                   expect(MockItem.renderPost).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("tagNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.tagNote({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("untagNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.untagNote({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("markNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.markNote({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unmarkNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unmarkNote({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("likeNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.likeNote({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unlikeNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unlikeNote({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("flagNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.flagNote({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unflagNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unflagNote({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("updateNote",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Note,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.updateNote({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Note",function(){
                   expect(activityObjects.Note.spawn).toHaveBeenCalled();
               });
               it("should render the Note for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedNote",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
        });
        describe("Status actions",function(){
           beforeEach(function(){
               MockItem = activityObjects.Status.spawn({
                   item:{content:"c",permalink:"p"},
                   user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                   feed:"feed"
               });
           });
           describe("submitStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderPost");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.submitStatus({summary:"s",content:"c",title:"t",permalink:"p"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);
                    
                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderPost.mostRecentCall.args[0];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for post",function(){
                   expect(MockItem.renderPost).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("tagStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.tagStatus({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("untagStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.untagStatus({summary:"s",content:"c",title:"t",permalink:"p"}, {title:"title",id:"id"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("markStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.markStatus({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unmarkStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unmarkStatus({summary:"s",content:"c",title:"t",permalink:"p"},{title:"title",id:"id"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("likeStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.likeStatus({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unlikeStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unlikeStatus({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("flagStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.flagStatus({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("unflagStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.unflagStatus({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
           describe("updateStatus",function(){
               beforeEach(function(){
                   spyOn(MockItem,"renderUpdate");
                   spyOn(activityObjects.Status,"spawn").andReturn(MockItem);
                   callback = jasmine.createSpy();
                   itemsAPI.updateStatus({summary:"s",content:"c",title:"t",permalink:"p"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);
                   // Retrieve the callback of renderPost
                   var cb = MockItem.renderUpdate.mostRecentCall.args[1];
                   // SpyOn what the callback is supposed to call
                   spyOn(itemsAPI.itemsAPICore,"submit");
                   // Call the callback
                   cb("err","data");
               });
               it("should spawn a new Status",function(){
                   expect(activityObjects.Status.spawn).toHaveBeenCalled();
               });
               it("should render the Status for update",function(){
                   expect(MockItem.renderUpdate).toHaveBeenCalled();
               });
               it("should submit the renderedStatus",function(){
                   expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
               })
           });
       })
    });

    describe("invalid options",function(){
        it("should throw an exception",function(){
            expect(function(){
                itemsAPI = ItemsAPI.spawn({
                    parameters:{feed:"feed"}
                })
            }).toThrow({name:"Invalid initialisation exception", error : "Specify API Key, secret and feed"})

        })
    })

});