var render;
var fs = require("fs");


// Tests mostly copied/pasted from former echo.test.js
describe("Render",function(){
    beforeEach(function(){
        render = require("Render.js").Render;
    });

    describe("renderTemplate method", function(){
        var renderedCallback;

        beforeEach(function(){
            renderedCallback = jasmine.createSpy();
            spyOn(fs,'readFile').andReturn('template');
            spyOn(render,'getFileCallback').andReturn('callback');
        });

        describe("with cached template",function(){
            beforeEach(function(){
                spyOn(render,'render').andReturn("Rendered template");
                render.templateCache['I am a filename'] = 'I am a template';
                render.renderTemplate("I am a filename","I am data", renderedCallback);
            });

            it("should load the file",function(){
                expect(fs.readFile).not.toHaveBeenCalled();
            });

            it("should call the tmpl function",function(){
                expect(render.render).toHaveBeenCalledWith('I am a template','I am data');
            });

            it("should call the callback with the rendered template",function(){
                expect(renderedCallback).toHaveBeenCalledWith(null,"Rendered template");
            });
        });

        describe("with non cached template",function(){
            beforeEach(function(){
                render.templateCache = {};
                render.renderTemplate("I am the filename","I am template data",renderedCallback);
            });

            it("should pass the filename to the getFileCallback",function(){
                expect(render.getFileCallback).toHaveBeenCalledWith('I am the filename',"I am template data",renderedCallback);
            });

            it("should load the template file",function(){
                expect(fs.readFile).toHaveBeenCalledWith('I am the filename','utf8','callback');
            });
        });
    });
    describe("getFileCallback", function(){
        var callback,
                readCallback;

        beforeEach(function(){
            readCallback = jasmine.createSpy();
            callback = render.getFileCallback('filename','I am template data',readCallback);
        });

        it("should return a callback", function(){
            expect(typeof callback).toEqual('function');
        });

        describe("call callback with data", function(){
            beforeEach(function(){
                spyOn(render,'render').andReturn("Rendered template");
                callback(null,"I am a template");
            });

            it("should save the data to the cache", function(){
                expect(render.templateCache['filename']).toEqual("I am a template");
            });

            it("should call the tmpl function",function(){
                expect(render.render).toHaveBeenCalledWith('I am a template','I am template data');
            });

            it("should call the callback with the rendered template",function(){
                expect(readCallback).toHaveBeenCalledWith(null,"Rendered template");
            });
        });

        describe("call callback with error", function(){
            beforeEach(function(){
                callback({ name: "I am an error" },null);
            });

            it("should pass the error on",function(){
                expect(readCallback).toHaveBeenCalledWith({ name: "I am an error" });
            });
        });
    });
});
