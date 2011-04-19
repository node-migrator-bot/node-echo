var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("req",function(){
    describe("post",function(){
        describe("oauth authentication",function(){
            beforeEach(function(){
                spyOn(req,"postOAuth");
                req.post({authHandler:"oauth"},"url","data",callback)
            });
            it("should call the postOAuth method",function(){
                expect(req.postOAuth).toHaveBeenCalledWith({authHandler:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"postBasic");
                req.post({authHandler:"basic"},"url","data",callback)
            });
            it("should call the postBasic method",function(){
                expect(req.postBasic).toHaveBeenCalledWith({authHandler:"basic"},"url","data",callback)
            })
        });
        describe("invalid authentication",function(){
            it("should throw an exception",function(){
                expect(function(){req.post({authHandler:"illegal_auth"},"url","data",callback)}).toThrow({name:'Illegal auth handler exception',error:'auth Handler illegal_auth not valid'})
            })
        })
    });

    describe("get",function(){
        describe("oauth authentication",function(){
            beforeEach(function(){
                spyOn(req,"getOAuth");
                req.get({authHandler:"oauth"},"url","data",callback)
            });
            it("should call the getOAuth method",function(){
                expect(req.getOAuth).toHaveBeenCalledWith({authHandler:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"getBasic");
                req.get({authHandler:"basic"},"url","data",callback)
            });
            it("should call the reqBasic method",function(){
                expect(req.getBasic).toHaveBeenCalledWith({authHandler:"basic"},"url","data",callback)
            })
        })
        describe("invalid authentication",function(){
            it("should throw an exception",function(){
                expect(function(){req.get({authHandler:"illegal_auth"},"url","data",callback)}).toThrow({name:'Illegal auth handler exception',error:'auth Handler illegal_auth not valid'})
            })
        })

    })
})