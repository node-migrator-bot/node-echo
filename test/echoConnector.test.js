var eC ;


describe("EchoConnector",function(){
    describe("valid connector",function(){
        beforeEach(function(){
            eC = new (require("echoConnector.js").EchoConnector)("consumerKey","consumerSecret","feed");
        });
        it("should be properly initialised",function(){
            expect(eC.consumerKey).toEqual("consumerKey");
            expect(eC.consumerSecret).toEqual("consumerSecret");
            expect(eC.feed).toEqual("feed")
        })
        describe("the rest",function(){
            it("is not functional",function(){
                expect(true).toBe(false)
            })
        })
    })
})