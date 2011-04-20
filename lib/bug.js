var MyBuggyClass = require("Buggy.js");



var MyBuggyCall = function(){

};

MyBuggyCall.prototype.bug = function(){
    var buggy = MyBuggyClass.Buggy.spawn({property:{content:"a regular property"}});
    console.log(require("util").inspect(buggy));
    var superbuggy = MyBuggyClass.SuperBuggy.spawn({property:{content:"a regular property"}});
    console.log(require("util").inspect(superbuggy))
};

exports.MyBuggyCall = MyBuggyCall;