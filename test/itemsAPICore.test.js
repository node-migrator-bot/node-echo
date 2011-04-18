
var ItemsAPI = require("ItemsAPICore.js").ItemsAPICore;
var itemsAPI;
var apiHost = "api.echoenabled.com";


describe("ItemsAPI",function(){
    describe("constructor with valid options",function(){
        beforeEach(function(){
            itemsAPI = new ItemsAPI({consumerKey: "I am a key",consumerSecret: "I am a secret"})
        });
        it("should set apiUrl to a default value", function(){
            expect(itemsAPI.apiHost).toEqual(apiHost);
        });

        it("should set consumerKey to the passed value",function(){
            expect(itemsAPI.consumerKey).toEqual("I am a key");
        });
        it("should set consumerSecret to the passed value",function(){
            expect(itemsAPI.consumerSecret).toEqual("I am a secret");
        });

        describe("submit",function(){

        })
        describe("search",function(){

        })
        describe("count",function(){

        })
    })
    describe("constructor with no options", function(){
        var excp;

        beforeEach(function(){
            try{
                new ItemsAPI();
            }
            catch(e){
                excp = e;
            }
        });

        it("should throw and exception", function(){
            expect(excp).toBeDefined();
            expect(excp.name).toEqual("node-echo: Option not set exception");
            expect(excp.message).toEqual("ItemsAPI requires the consumerKey option to be defined");
        });
    });

});