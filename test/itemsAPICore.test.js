var ItemsAPICore = require("ItemsAPICore.js").ItemsAPICore;
var itemsAPI;
var apiHost = "api.echoenabled.com";
var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("ItemsAPICore",function(){
    describe("constructor with valid options",function(){
        beforeEach(function(){
            itemsAPI = ItemsAPICore.spawn({parameters:{consumerKey: "Key",consumerSecret: "Secret"}})
        });
        it("should set apiUrl to a default value", function(){
            expect(itemsAPI.parameters.apiHost).toEqual(apiHost);
        });

        it("should set consumerKey to the passed value",function(){
            expect(itemsAPI.parameters.consumerKey).toEqual("Key");
        });
        it("should set consumerSecret to the passed value",function(){
            expect(itemsAPI.parameters.consumerSecret).toEqual("Secret");
        });
        describe("submit",function(){
            beforeEach(function(){
                spyOn(req,"post");
                itemsAPI.submit("",{data:"data"},callback)
            });
            it("should have called req.post",function(){
                expect(req.post).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
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
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
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
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
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
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/mux',
                   {query:"query"},
                   callback)
            })
        })
    });
    describe("constructor with no options", function(){
        var excp;
        it("should throw and exception", function(){
            expect(function(){
                ItemsAPICore.spawn({parameters:{}});
            }).toThrow({ name: "Options not set exception", message: "ItemsAPICore requires a consumerKey and a consumerSecret option to be defined" })
        });
    });
});