if(typeof Class === 'undefined') Class = require('./Class.js').Class;

var Buggy = Class.extend({
    init:function(){
    }
    ,property:{
        enumerable: true
    }
});

var SuperBuggy = Buggy.extend({
    init: function(){
        this._super();
        this.property.hidden = "Hi Ed !"
    }
});

exports.Buggy = Buggy;
exports.SuperBuggy = SuperBuggy;