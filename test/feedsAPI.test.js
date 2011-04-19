var FeedsAPI;
var req = require("req.js").req;
var callback;

describe("FeedsAPI",function(){
    describe("constructor",function(){
        describe("valid properties",function(){
            beforeEach(function(){
                FeedsAPI = new (require("feedsAPI.js").FeedsAPI)({consumerSecret: "Secret", consumerKey:"Key"});
            });
            it("should be properly initialised",function(){
                expect(FeedsAPI.options.consumerSecret).toEqual("Secret");
                expect(FeedsAPI.options.consumerKey).toEqual("Key");
                expect(FeedsAPI.options.apiHost).toEqual('api.echoenabled.com');
                expect(FeedsAPI.options.authHandler).toEqual('oauth')
            });
            describe("list",function(){
                beforeEach(function(){
                    spyOn(req,"get");
                    callback = jasmine.createSpy();
                    FeedsAPI.list(callback)
                });
                it("should have called req.get",function(){
                   expect(req.get).toHaveBeenCalledWith(
                   { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/feeds/list',
                   "",
                   callback)
                })
            });
            describe("register",function(){
                beforeEach(function(){
                    spyOn(req,"get");
                    callback = jasmine.createSpy();
                    FeedsAPI.register({url:"url"},callback)
                });
                it("should have called req.get",function(){
                   expect(req.get).toHaveBeenCalledWith(
                   { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                   '/v1/feeds/register',
                   {url:"url",interval:10},
                   callback)
                })
            });
            describe("unregister",function(){
                describe("register",function(){
                    beforeEach(function(){
                        spyOn(req,"get");
                        callback = jasmine.createSpy();
                        FeedsAPI.unregister({url:"url"},callback)
                    });
                    it("should have called req.get",function(){
                       expect(req.get).toHaveBeenCalledWith(
                       { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"},
                       '/v1/feeds/unregister',
                       {url:"url"},
                       callback)
                    })
                });
            });
        });
        describe("invalid properties",function(){
            expect(function(){
                FeedsAPI = new (require("feedsAPI.js").FeedsAPI)({});
            }).toThrow({ name: "Options not set exception", message: "FeedsAPI requires the consumerKey option to be defined" })
        })
    })
});