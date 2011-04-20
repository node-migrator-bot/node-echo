var Bugs = require("Buggy.js");
var BuggyCall = require("bug.js").MyBuggyCall;

describe("SuperBuggy",function(){
    beforeEach(function(){
        spyOn(Bugs.SuperBuggy,"spawn").andCallThrough();
        spyOn(Bugs.Buggy,"spawn").andCallThrough();
        buggycall = new (BuggyCall);
        buggycall.bug()
    });

    it("should have called spawn",function(){
        expect(Bugs.Buggy.spawn).toHaveBeenCalled()
    });
    it("should have called spawn with the expected parameters",function(){
        expect(Bugs.Buggy.spawn).toHaveBeenCalledWith({property:{content:"a regular property"}});
    });

    it("should have called spawn",function(){
        expect(Bugs.SuperBuggy.spawn).toHaveBeenCalled()
    });
    it("should have called spawn with the expected parameters",function(){
        expect(Bugs.SuperBuggy.spawn).toHaveBeenCalledWith({property:{content:"a regular property"}});
    })
});