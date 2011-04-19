var KvsAPI;
var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("KvsAPI",function(){
    describe("constructor",function(){
        describe("valid properties",function(){
            beforeEach(function(){
                KvsAPI = new (require("kvsAPI.js").KvsAPI)({consumerSecret: "Secret", consumerKey:"Key"});
            });
            it("should be properly initialised",function(){
                expect(KvsAPI.options.consumerSecret).toEqual("Secret");
                expect(KvsAPI.options.consumerKey).toEqual("Key");
                expect(KvsAPI.options.apiHost).toEqual('api.echoenabled.com');
                expect(KvsAPI.options.authHandler).toEqual('oauth')
            });
            describe("get",function(){
                describe("public KV",function(){
                    beforeEach(function(){
                        spyOn(req,"get");
                        KvsAPI.get({key:"value"},true,callback)
                    });
                    it("should call req.get",function(){
                        expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"}
                                ,'http://api.echoenabled.com/v1/kvs/get'
                                ,{key:"value"}
                                ,callback)
                    })
                });
                describe("private KV",function(){
                    beforeEach(function(){
                        beforeEach(function(){
                            spyOn(req,"get");
                            KvsAPI.get({key:"value",appkey:"appkey"},false,callback)
                        });
                        it("should call req.get",function(){
                            expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"}
                                    ,'https://api.echoenabled.com/v1/kvs/get'
                                    ,{key:"value", appkey:"appkey"}
                                    ,callback)
                        })
                    })
                })
            });
            describe("put",function(){
                beforeEach(function(){
                    spyOn(req,"post");
                    KvsAPI.put({key:"value"},callback)
                })
                it("should have call req.post",function(){
                    expect(req.post).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"}
                   ,'https://api.echoenabled.com/v1/kvs/put'
                   ,{key:"value", public:false}
                   ,callback)
                })
            });
            describe("del",function(){
                describe("public KV",function(){
                    beforeEach(function(){
                        spyOn(req,"get");
                        KvsAPI.del({key:"value"},true,callback)
                    });
                    it("should call req.get",function(){
                        expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"}
                                ,'http://api.echoenabled.com/v1/kvs/delete'
                                ,{key:"value"}
                                ,callback)
                    })
                });
                describe("private KV",function(){
                    beforeEach(function(){
                        beforeEach(function(){
                            spyOn(req,"get");
                            KvsAPI.del({key:"value",appkey:"appkey"},false,callback)
                        });
                        it("should call req.get",function(){
                            expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authHandler : 'oauth', apiHost:"api.echoenabled.com"}
                                    ,'https://api.echoenabled.com/v1/kvs/delete'
                                    ,{key:"value", appkey:"appkey"}
                                    ,callback)
                        })
                    })
                })
            });
        });
        describe("invalid properties",function(){
            expect(function(){
                KvsAPI = new (require("kvsAPI.js").KvsAPI)({});
            }).toThrow({ name: "Option not set exception", message: "KvsAPI requires the consumerKey option to be defined" })
        })
    })
})