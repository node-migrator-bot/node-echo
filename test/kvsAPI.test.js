var KvsAPI;
var req = require("req.js").req;
var callback = jasmine.createSpy();

var kvs = {
    "key":"key",
    "value":"value"
};

describe("KvsAPI",function(){
    describe("constructor",function(){
        describe("valid properties",function(){
            beforeEach(function(){
                KvsAPI = require("kvsAPI.js").KvsAPI.spawn({parameters:{consumerSecret: "Secret", consumerKey:"Key"}});
            });
            it("should be properly initialised",function(){
                expect(KvsAPI.parameters.consumerSecret).toEqual("Secret");
                expect(KvsAPI.parameters.consumerKey).toEqual("Key");
                expect(KvsAPI.parameters.apiHost).toEqual('api.echoenabled.com');
                expect(KvsAPI.parameters.authMethod).toEqual('oauth')
            });
            describe("get",function(){
                describe("public KV",function(){
                    beforeEach(function(){
                        spyOn(req,"get");
                        KvsAPI.get(kvs,"appkey",callback)
                    });
                    it("should call req.get",function(){
                        expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"}
                                ,'/v1/kvs/get'
                                ,{key:"key","value":"value"}
                                ,callback)
                    })
                });
                describe("private KV",function(){
                    beforeEach(function(){
                        beforeEach(function(){
                            spyOn(req,"get");
                            KvsAPI.get(key,"appkey",callback)
                        });
                        it("should call req.get",function(){
                            expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"}
                                    ,'https://api.echoenabled.com/v1/kvs/get'
                                    ,{key:"key","value":"value", appkey:"appkey"}
                                    ,callback)
                        })
                    })
                })
            });
            describe("put",function(){
                beforeEach(function(){
                    spyOn(req,"post");
                    KvsAPI.put(kvs,callback)
                });
                it("should have call req.post",function(){
                    expect(req.post).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"}
                   ,'/v1/kvs/put'
                   ,{key:"key",value:"value"}
                   ,callback)
                })
            });
            describe("del",function(){
                describe("public KV",function(){
                    beforeEach(function(){
                        spyOn(req,"get");
                        KvsAPI.del(kvs,callback)
                    });
                    it("should call req.get",function(){
                        expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"}
                                ,'/v1/kvs/delete'
                                ,{key:"key",value:"value"}
                                ,callback)
                    })
                });
                describe("private KV",function(){
                    beforeEach(function(){
                        beforeEach(function(){
                            spyOn(req,"get");
                            KvsAPI.del(kvs,callback)
                        });
                        it("should call req.get",function(){
                            expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"}
                                    ,'/v1/kvs/delete'
                                    ,{key:"value", appkey:"appkey"}
                                    ,callback)
                        })
                    })
                })
            });
        });
        describe("invalid properties",function(){
            expect(function(){
                KvsAPI = require("kvsAPI.js").KvsAPI.spawn({parameters:{}});
            }).toThrow({ name: "KvsAPI : Option not set exception", message: "KvsAPI requires the consumerKey option to be defined" })
        })
    })
})