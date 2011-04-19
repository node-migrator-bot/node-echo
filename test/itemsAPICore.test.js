var ItemsAPICore = require("ItemsAPICore.js").ItemsAPICore;
var itemsAPI;
var apiHost = "api.echoenabled.com";
var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("ItemsAPICore",function(){
    describe("constructor with valid options",function(){
        beforeEach(function(){
            itemsAPI = new ItemsAPICore({consumerKey: "Key",consumerSecret: "Secret"})
        });
        it("should set apiUrl to a default value", function(){
            expect(itemsAPI.options.apiHost).toEqual(apiHost);
        });

        it("should set consumerKey to the passed value",function(){
            expect(itemsAPI.options.consumerKey).toEqual("Key");
        });
        it("should set consumerSecret to the passed value",function(){
            expect(itemsAPI.options.consumerSecret).toEqual("Secret");
        });
        describe("submit",function(){
            beforeEach(function(){
                spyOn(req,"post");
                itemsAPI.submit("",{data:"data"},callback)
            });
            it("should have called req.post",function(){
                expect(req.post).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/submit',
                   {data:"data"},
                   callback)
            })
        });
        describe("search",function(){
            beforeEach(function(){
                spyOn(req,"get");
                itemsAPI.search({query:"query"},callback)
            });
            it("should have called req.get",function(){
                expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/search',
                   {query:"query"},
                   callback)
            })
        });
        describe("count",function(){
            beforeEach(function(){
                spyOn(req,"get");
                itemsAPI.count({query:"query"},callback)
            });
            it("should have called req.get",function(){
                expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/count',
                   {query:"query"},
                   callback)
            })
        });
        describe("mux",function(){
            beforeEach(function(){
                spyOn(req,"get");
                itemsAPI.mux({query:"query"},callback)
            });
            it("should have called req.get",function(){
                expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/mux',
                   {query:"query"},
                   callback)
            })
        })
    });
    describe("constructor with no options", function(){
        var excp;
        beforeEach(function(){
            try{
                new ItemsAPICore();
            }
            catch(e){
                excp = e;
            }
        });
        it("should throw and exception", function(){
            expect(excp).toBeDefined();
            expect(excp.name).toEqual("Options not set exception");
            expect(excp.message).toEqual("ItemsAPICore requires a consumerKey and a consumerSecret option to be defined");
        });
    });
});