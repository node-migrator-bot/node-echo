var utils = require("utils.js");
var render = require("render.js").Render;
var fs = require("fs");


var myArticle;
var mock_cb = jasmine.createSpy();
var first_cb, second_cb,third_cb; // Callback
var callback;
var update;

describe("parent class ActivityObject",function(){
    var myItem;
    describe("init",function(){
        describe("valid Item",function(){
            beforeEach(function(){
                myItem = require("activityObjects.js").ActivityObject.spawn(
                {
                     item:{content:{},feed:"http://moncul.com",user:{id:"bob42",avatarURL:"http://myavatar.com",name:"Robert Paulson"}}
                })
            });
            it("should be properly initialized",function(){
                expect(myItem.item.type).toEqual("abstract");
                expect(myItem.item.feed).toEqual("http://moncul.com")
                expect(myItem.item.user.id).toEqual("bob42")
                expect(myItem.item.user.name).toEqual("Robert Paulson")
                expect(myItem.item.user.avatarURL).toEqual("http://myavatar.com")
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    callback = jasmine.createSpy();
                    myItem.renderItem(callback)
                });
                it("should have called the callback",function(){
                    expect(callback).toHaveBeenCalledWith("","");
                })
            });
            describe("renderPost",function(){
                beforeEach(function(){
                    callback = jasmine.createSpy();
                    spyOn(myItem,"renderItem");
                    myItem.renderPost(callback);
                    first_cb = myItem.renderItem.mostRecentCall.args[0] //Get the callback
                });
                it("should have call renderItem",function(){
                    expect(myItem.renderItem).toHaveBeenCalled();
                });
                describe("callback of renderItem",function(){
                    beforeEach(function(){
                        spyOn(render,"renderTemplate");
                        first_cb("",""); // This is the default render of renderItem anyway.
                        second_cb = render.renderTemplate.mostRecentCall.args[2]
                    });
                    it("should have called renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            second_cb("","Hello World!")
                        });
                        it("should have called the callback",function(){
                            expect(callback).toHaveBeenCalledWith("",{content:"Hello World!"})
                        })
                    })
                })
            })
        })
    });
    describe("invalid Item",function(){
        describe("invalid user",function(){
            it("should cry in public",function(){
                expect(function(){
                    myItem = require("activityObjects.js").ActivityObject.spawn(
                    {
                        item:{content:{},feed:"yo"}
                    })
                } ).toThrow({name :"Invalid user exception", error : "Invalid user"})
            })
        });
        describe("invalid feed",function(){
            it("should cry in public",function(){
                expect(function(){
                    myItem = require("activityObjects.js").ActivityObject.spawn(
                    {
                        item:{content:{},user:{id:"bob42",avatarURL:"http://myavatar.com",name:"Robert Paulson"}}
                    })
                } ).toThrow({name : "Invalid options exception", error :"Invalid feed"})
            })
        })
    })
});



describe("class Article",function(){
    describe("init",function(){
        describe("valid article",function(){
            beforeEach(function(){
                myArticle = require("activityObjects.js").Article.spawn(
                {
                     item:{content:{title:"titre",summary:"summary",content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"}});
            });
            it("should be properly initialised",function(){
                expect(myArticle.item.content.title).toEqual("titre");
                expect(myArticle.item.content.summary).toEqual("summary");
                expect(myArticle.item.content.content).toEqual("content");
                expect(myArticle.item.content.permalink).toEqual("permalink");
                expect(myArticle.item.type).toEqual("http://activitystrea.ms/schema/1.0/article");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myArticle.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid article",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myArticle = require("activityObjects.js").Article.spawn(
                        {
                             item:{content:{summary:"summary",content:"content",permalink:"permalink"}
                            ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                            ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Article exception", error:"Article needs a title, a summary, a content, a permalink and a feed ID"});
            })
        })
    })
});

describe("class Comment",function(){
    describe("init",function(){
        describe("valid comment",function(){
            beforeEach(function(){
                myComment = require("activityObjects.js").Comment.spawn(
                {
                     item:{content:{subject:"titre",content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"}});
            });
            it("should be properly initialised",function(){
                expect(myComment.item.content.subject).toEqual("titre");
                expect(myComment.item.content.content).toEqual("content");
                expect(myComment.item.content.permalink).toEqual("permalink");
                expect(myComment.item.type).toEqual("http://activitystrea.ms/schema/1.0/comment");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate")
                    myComment.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid comment",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myComment = require("activityObjects.js").Comment.spawn(
                    {
                         item:{content:{content:"content",permalink:"permalink"}
                        ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Comment exception", error:"Comment needs a subject, a content and a permalink"});
            })
        })
    })
});

describe("class Note",function(){
    describe("init",function(){
        describe("valid note",function(){
            beforeEach(function(){
                myNote = require("activityObjects.js").Note.spawn(
                {
                     item:{content:{content:"content",permalink:"permalink"},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"}});
            });
            it("should be properly initialised",function(){
                expect(myNote.item.content.content).toEqual("content");
                expect(myNote.item.content.permalink).toEqual("permalink");
                expect(myNote.item.type).toEqual("http://activitystrea.ms/schema/1.0/note");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myNote.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid note",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myNote = require("activityObjects.js").Note.spawn(
                    {
                         item:{content:{},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Note exception", error:"Note needs a content and a permalink"});
            })
        })
    })
});

describe("class Status",function(){
    describe("init",function(){
        describe("valid status",function(){
            beforeEach(function(){
                myStatus = require("activityObjects.js").Status.spawn(
                {
                     item:{content:{content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"}});
            });
            it("should be properly initialised",function(){
                expect(myStatus.item.content.content).toEqual("content");
                expect(myStatus.item.content.permalink).toEqual("permalink");
                expect(myStatus.item.type).toEqual("http://activitystrea.ms/schema/1.0/status");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myStatus.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid status",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myStatus = require("activityObjects.js").Status.spawn(
                    {
                         item:{content:{},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Status exception", error:"Status needs a content and a permalink"});
            })
        })
    })
});

describe("class Tag",function(){
    describe("init",function(){
        describe("valid tag",function(){
            beforeEach(function(){
                myTag = require("activityObjects.js").Tag.spawn(
                {
                     item:{content:{title:"title",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
            });
            it("should be properly initialised",function(){
                expect(myTag.item.content.permalink).toEqual("permalink");
                expect(myTag.item.content.title).toEqual("title");
                expect(myTag.item.type).toEqual("http://activitystrea.ms/schema/1.0/tag");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myTag.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid tag",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myTag = require("activityObjects.js").Tag.spawn(
                    {
                         item:{content:{},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Tag exception", error:"Tag needs a valid target"});
            })
        })
    })
});


describe("class Like",function(){
    describe("init",function(){
        describe("valid like",function(){
            beforeEach(function(){
                myLike = require("activityObjects.js").Like.spawn(
                {
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
            });
            it("should be properly initialised",function(){
                expect(myLike.item.content.permalink).toEqual("permalink");
                expect(myLike.item.type).toEqual("http://activitystrea.ms/schema/1.0/like");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myLike.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid like",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myLike = require("activityObjects.js").Like.spawn(
                    {
                         item:{content:{},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Like exception", error:"Like needs a valid target"});
            })
        })
    })
});


describe("class Flag",function(){
    describe("init",function(){
        describe("valid flag",function(){
            beforeEach(function(){
                myFlag = require("activityObjects.js").Flag.spawn(
                {
                     item:{content:{permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com",target:{id:"id",type:"blabla"}}});
            });
            it("should be properly initialised",function(){
                expect(myFlag.item.content.permalink).toEqual("permalink");
                expect(myFlag.item.type).toEqual("http://activitystrea.ms/schema/1.0/flag");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myFlag.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                })
            })
        });
        describe("invalid flag",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myFlag = require("activityObjects.js").Flag.spawn(
                    {
                         item:{content:{},user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"}});
                }).toThrow({name : "Invalid Flag exception", error:"Flag needs a valid target"});
            })
        })
    })
});

