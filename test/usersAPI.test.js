var UsersAPI;
var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("UsersAPI",function(){
    describe("constructor",function(){
        describe("valid properties",function(){
            beforeEach(function(){
                UsersAPI = require("usersAPI.js").UsersAPI.spawn({parameters:{consumerSecret: "Secret", consumerKey:"Key"}});
            });
            it("should be properly initialised",function(){
                expect(UsersAPI.parameters.consumerSecret).toEqual("Secret");
                expect(UsersAPI.parameters.consumerKey).toEqual("Key");
                expect(UsersAPI.parameters.apiHost).toEqual('api.echoenabled.com');
                expect(UsersAPI.parameters.authMethod).toEqual('oauth');
            });
            describe("get",function(){
                beforeEach(function(){
                    spyOn(req,"get");
                    UsersAPI.get("id",callback)
                });
                it("should have call req.get",function(){
                    expect(req.get).toHaveBeenCalledWith(
                    { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
                    '/v1/users/get',
                    {identityURL:"id"},
                    callback)
                })
            });
            describe("update",function(){
                beforeEach(function(){
                    spyOn(req,"post");
                    UsersAPI.update({identityURL:"id",title:"title",content:"content"},callback)
                });
                it("should have call req.post",function(){
                    expect(req.post).toHaveBeenCalledWith(
                    { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
                    '/v1/users/update',
                    { identityURL : 'id', title : 'title', content : 'content' },
                    callback)
                })
            });
            describe("whoAmI",function(){
                beforeEach(function(){
                    spyOn(req,"get");
                    UsersAPI.whoAmI({appkey:"appkey",sessionID:"sessionID"},callback)
                });
                it("should have call req.post",function(){
                    expect(req.get).toHaveBeenCalledWith(
                        { consumerKey:"Key", consumerSecret: "Secret", authMethod : 'oauth', apiHost:"api.echoenabled.com"},
                        '/v1/users/whoami',
                        {appkey:"appkey",sessionID:"sessionID"},
                        callback)
                })

            });
        });
        describe("invalid properties",function(){
            expect(function(){
                                UsersAPI = require("usersAPI.js").UsersAPI.spawn({parameters:{}});
            }).toThrow({ name: "UsersAPI: Option not set exception", message: "UsersAPI requires the consumerKey option to be defined" })
        })
    })
})