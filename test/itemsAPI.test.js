var ItemsAPI = require("itemsAPI.js").ItemsAPI; // Object
var activityObjects = require("activityObjects.js");
var itemsAPI ; // Instance of ItemsAPI;
var callback;

describe("itemsAPI",function(){
    describe("valid options",function(){
        beforeEach(function(){
            itemsAPI = new ItemsAPI({
                 consumerKey:"Key"
                ,consumerSecret:"Secret"
                ,feed:"feed"
            })
        });
        it("should be initialised",function(){
            expect(itemsAPI.feed).toEqual('feed');
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
//        describe("Article actions",function(){
//            beforeEach(function(){
//                spyOn(activityObjects.Article,"spawn").andCallThrough();
//            });
//            describe("submitArticle",function(){
//                beforeEach(function(){
//                    spyOn(itemsAPI.itemsAPICore,"submit");
//                    callback = jasmine.createSpy();
//                    itemsAPI.submitArticle({summary:"s",content:"c",title:"t",permalink:"p"}, {id:"id",name:"emmanuel",avatarURL:"avatar"},'feed',callback)
//                });
//                it("should spawn a new article",function(){
//                    expect(activityObjects.Article.spawn).toHaveBeenCalledWith(
//                        {
//                              item:{summary:"s",content:"c",title:"t",permalink:"p",type:'http://activitystrea.ms/schema/1.0/article', id : 'p', url : 'p'} // THIS IS FOOBAR !
//                            , user:{id:"id",name:"emmanuel",avatarURL:"avatar"}
//                            , feed:'feed'}
//                        )
//                });
//            })
//        })
    });
    
    describe("invalid options",function(){
        it("should throw an exception",function(){
            expect(function(){
                itemsAPI = new ItemsAPI({
                    feed:"feed"
                })
            }).toThrow({name:"Invalid initialisation exception", error : "Specify API Key, secret and feed"})

        })
    })

});