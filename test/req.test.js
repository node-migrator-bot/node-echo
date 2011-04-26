var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("req",function(){
    describe("post",function(){
        describe("oauth authentication",function(){
            beforeEach(function(){
                spyOn(req,"postOAuth");
                req.post({authMethod:"oauth"},"url","data",callback)
            });
            it("should call the postOAuth method",function(){
                expect(req.postOAuth).toHaveBeenCalledWith({authMethod:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"postBasic");
                req.post({authMethod:"basic"},"url","data",callback)
            });
            it("should call the postBasic method",function(){
                expect(req.postBasic).toHaveBeenCalledWith({authMethod:"basic"},"url","data",callback)
            })
        });
        describe("invalid authentication",function(){
            it("should throw an exception",function(){
                expect(function(){req.post({authMethod:"illegal_auth"},"url","data",callback)}).toThrow({name:'Illegal auth method exception',error:'auth method illegal_auth not valid'})
            })
        })
    });

    describe("get",function(){
        describe("oauth authentication",function(){
            beforeEach(function(){
                spyOn(req,"getOAuth");
                req.get({authMethod:"oauth"},"url","data",callback)
            });
            it("should call the getOAuth method",function(){
                expect(req.getOAuth).toHaveBeenCalledWith({authMethod:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"getBasic");
                req.get({authMethod:"basic"},"url","data",callback)
            });
            it("should call the reqBasic method",function(){
                expect(req.getBasic).toHaveBeenCalledWith({authMethod:"basic"},"url","data",callback)
            })
        })
        describe("invalid authentication",function(){
            it("should throw an exception",function(){
                expect(function(){req.get({authMethod:"illegal_auth"},"url","data",callback)}).toThrow({name:'Illegal auth method exception',error:'auth method illegal_auth not valid'})
            })
        })

    })
})