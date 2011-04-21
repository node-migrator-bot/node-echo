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
        describe("tag",function(){
            beforeEach(function(){
                MockItem = activityObjects.Tag.spawn(                  {
                     item:{content:{title:"title",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Tag,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.tag({id:"idtag",title:"title"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Tag",function(){
                expect(activityObjects.Tag.spawn).toHaveBeenCalled();
            });
            it("should render the Tag for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Tag",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });
        
        describe("untag",function(){
            beforeEach(function(){
                MockItem = activityObjects.Tag.spawn(                  {
                     item:{content:{title:"title",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Tag,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.untag({id:"iduntag",title:"title"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Tag",function(){
                expect(activityObjects.Tag.spawn).toHaveBeenCalled();
            });
            it("should render the Tag for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Tag",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });
        
        describe("like",function(){
            beforeEach(function(){
                MockItem = activityObjects.Like.spawn({
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Like,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.like({id:"idlike"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Like",function(){
                expect(activityObjects.Like.spawn).toHaveBeenCalled();
            });
            it("should render the Like for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Like",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });

        describe("unlike",function(){
            beforeEach(function(){
                MockItem = activityObjects.Like.spawn({
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Like,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.unlike({id:"idunlike"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Like",function(){
                expect(activityObjects.Like.spawn).toHaveBeenCalled();
            });
            it("should render the Like for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Like",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });

        describe("flag",function(){
            beforeEach(function(){
                MockItem = activityObjects.Flag.spawn({
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Flag,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.flag({id:"idflag"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Flag",function(){
                expect(activityObjects.Flag.spawn).toHaveBeenCalled();
            });
            it("should render the Flag for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Flag",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });
        describe("unflag",function(){
            beforeEach(function(){
                MockItem = activityObjects.Flag.spawn({
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
                spyOn(MockItem,"renderPost");
                spyOn(activityObjects.Flag,"spawn").andReturn(MockItem);
                callback = jasmine.createSpy();
                itemsAPI.unflag({id:"idunflag"},{id:"id",type:"type"},{id:"id",name:"emmanuel",avatarURL:"avatar"},callback);

                // Retrieve the callback of renderPost
                var cb = MockItem.renderPost.mostRecentCall.args[0];
                // SpyOn what the callback is supposed to call
                spyOn(itemsAPI.itemsAPICore,"submit");
                // Call the callback
                cb("err","data");
            });
            it("should spawn a new Flag",function(){
                expect(activityObjects.Flag.spawn).toHaveBeenCalled();
            });
            it("should render the Flag for post",function(){
                expect(MockItem.renderPost).toHaveBeenCalled();
            });
            it("should post the Flag",function(){
                expect(itemsAPI.itemsAPICore.submit).toHaveBeenCalledWith("err","data",callback)
            })
        });



        describe("submitArticle",function(){
            beforeEach(function(){
                MockItem = activityObjects.Article.spawn(                {
                     item:{content:{title:"titre",summary:"summary",content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"}});

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
        describe("submitComment",function(){
            beforeEach(function(){
                MockItem = activityObjects.Comment.spawn(
                {
                    item:{content:{subject:"s",content:"c",permalink:"p"},
                    user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                    feed:"feed"}});

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
        describe("submitNote",function(){
            beforeEach(function(){
               MockItem = activityObjects.Note.spawn({
                   item:{content:{content:"c",permalink:"p"},
                   user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                   feed:"feed"
               }});
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
        describe("submitStatus",function(){
            beforeEach(function(){
               MockItem = activityObjects.Status.spawn({
                   item:{content:{content:"c",permalink:"p"},
                   user:{id:"id",name:"emmanuel",avatarURL:"avatar"},
                   feed:"feed"
               }});
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
