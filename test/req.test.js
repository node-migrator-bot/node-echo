var req = require("req.js").req;
var callback = jasmine.createSpy();

describe("req",function(){
    describe("post",function(){
        describe("oauth authentication",function(){
            beforeEach(function(){
                spyOn(req,"reqOAuth");
                req.post({authHandler:"oauth"},"url","data",callback)
            });
            it("should call the reqOAuth method",function(){
                expect(req.reqOAuth).toHaveBeenCalledWith('POST',{authHandler:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"reqBasic");
                req.post({authHandler:"basic"},"url","data",callback)
            });
            it("should call the reqBasic method",function(){
                expect(req.reqBasic).toHaveBeenCalledWith("POST",{authHandler:"basic"},"url","data",callback)
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
                spyOn(req,"reqOAuth");
                req.get({authHandler:"oauth"},"url","data",callback)
            });
            it("should call the reqOAuth method",function(){
                expect(req.reqOAuth).toHaveBeenCalledWith('GET',{authHandler:"oauth"},"url","data",callback)
            })
        });
        describe("basic authentication",function(){
            beforeEach(function(){
                spyOn(req,"reqBasic");
                req.get({authHandler:"basic"},"url","data",callback)
            });
            it("should call the reqBasic method",function(){
                expect(req.reqBasic).toHaveBeenCalledWith("GET",{authHandler:"basic"},"url","data",callback)
            })
        })
        describe("invalid authentication",function(){
            it("should throw an exception",function(){
                expect(function(){req.get({authHandler:"illegal_auth"},"url","data",callback)}).toThrow({name:'Illegal auth handler exception',error:'auth Handler illegal_auth not valid'})
            })
        })

    })
})