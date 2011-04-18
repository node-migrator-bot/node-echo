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
                     item:{}
                    ,feed:"http://moncul.com"
                    ,user:{id:"bob42",avatarURL:"http://myavatar.com",name:"Robert Paulson"}
                })
            });
            it("should be properly initialized",function(){
                expect(myItem.item.type).toEqual("abstract");
                expect(myItem.feed).toEqual("http://moncul.com")
                expect(myItem.user.id).toEqual("bob42")
                expect(myItem.user.name).toEqual("Robert Paulson")
                expect(myItem.user.avatarURL).toEqual("http://myavatar.com")
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
            });
            describe("renderUpdate",function(){
                describe("illegal update",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "illegal type"
                            ,content : {
                                 title : "title"
                                ,id : "id"
                            }
                        };
                        myItem.renderUpdate(update,callback);
                    });
                    it("should raise an exception",function(){
                        expect(callback).toHaveBeenCalledWith({name:"Illegal update exception", error:"illegal type: not recognized as a valid update"},"")
                    })
                })
                describe("tag",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "tag"
                            ,content : {
                                 title : "title"
                                ,id : "id"
                            }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({tag:update.content});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                });
                describe("untag",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "untag"
                            ,content : {
                                 title : ""
                                ,id : ""
                            }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({tag:update.content});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("mark",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "mark"
                            ,content : {
                                 title : "mark title"
                                ,id : "id"
                            }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({marker:update.content});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("unmark",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "unmark"
                            ,content : {
                                 title : ""
                                ,id : ""
                            }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({marker:update.content});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("like",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "like"
                            ,content : { }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("unlike",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "unlike"
                            ,content : { }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("flag",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "flag"
                            ,content : { }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                describe("unflag",function(){
                    beforeEach(function(){
                        callback = jasmine.createSpy();
                        update = {
                             type: "unflag"
                            ,content : { }
                        };
                        spyOn(render,"renderTemplate");
                        myItem.renderUpdate(update,callback);
                        first_cb = render.renderTemplate.mostRecentCall.args[2] //Get the callback
                    });
                    it("should have call renderTemplate",function(){
                        expect(render.renderTemplate).toHaveBeenCalled();
                        expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({});
                    });
                    describe("callback of renderTemplate",function(){
                        beforeEach(function(){
                            first_cb("",""); // This is the default render of renderItem anyway.
                            second_cb = render.renderTemplate.mostRecentCall.args[2]
                        });
                        it("should have called renderTemplate, again",function(){
                            expect(render.renderTemplate).toHaveBeenCalled();
                            expect(render.renderTemplate.callCount).toEqual(2)
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
                });
                describe("update",function(){
                    beforeEach(function(){

                        update = {
                             type: "update"
                            ,content : { }
                        };
                        spyOn(myItem,"renderPost");
                        callback = jasmine.createSpy();
                        myItem.renderUpdate(update,callback);
                    });
                    it("should have call renderPost",function(){
                        expect(myItem.renderPost).toHaveBeenCalledWith(callback);
                    });
                })

            })
        });
        describe("invalid Item",function(){
            describe("invalid user",function(){
                it("should cry in public",function(){
                    expect(function(){
                        myItem = require("activityObjects.js").ActivityObject.spawn(
                        {
                             item:{}
                            ,feed:"http://moncul.com"
                            ,user:{}
                        })
                    } ).toThrow({name :"Invalid user exception", error : "Invalid user"})
                })
            })
            describe("invalid feed",function(){
                it("should cry in public",function(){
                    expect(function(){
                        myItem = require("activityObjects.js").ActivityObject.spawn(
                        {
                             item:{}
                            ,user:{id:"bob42",avatarURL:"http://myavatar.com",name:"Robert Paulson"}
                        })
                    } ).toThrow({name : "Invalid options exception", error :"Invalid feed"})
                })
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
                     item:{title:"titre",summary:"summary",content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"});
            });
            it("should be properly initialised",function(){
                expect(myArticle.item.title).toEqual("titre");
                expect(myArticle.item.summary).toEqual("summary");
                expect(myArticle.item.content).toEqual("content");
                expect(myArticle.item.permalink).toEqual("permalink");
                expect(myArticle.item.type).toEqual("http://activitystrea.ms/schema/1.0/article");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate")
                    myArticle.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                    expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({ article: myArticle.item })
                })
            })
        });
        describe("invalid article",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myArticle = require("activityObjects.js").Article.spawn(
                    {
                         item:{}
                        ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"});
                }).toThrow({name : "Invalid Article exception", error:"Article needs a title, a summary, a content an a permalink"});
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
                     item:{subject:"titre",content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"});
            });
            it("should be properly initialised",function(){
                expect(myComment.item.subject).toEqual("titre");
                expect(myComment.item.content).toEqual("content");
                expect(myComment.item.permalink).toEqual("permalink");
                expect(myComment.item.type).toEqual("http://activitystrea.ms/schema/1.0/comment");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate")
                    myComment.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                    expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({ comment: myComment.item })
                })
            })
        });
        describe("invalid comment",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myComment = require("activityObjects.js").Comment.spawn(
                    {
                         item:{}
                        ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"});
                }).toThrow({name : "Invalid Comment exception", error:"Comment needs a subject, a content an a permalink"});
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
                     item:{content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"});
            });
            it("should be properly initialised",function(){
                expect(myNote.item.content).toEqual("content");
                expect(myNote.item.permalink).toEqual("permalink");
                expect(myNote.item.type).toEqual("http://activitystrea.ms/schema/1.0/note");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myNote.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                    expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({ note: myNote.item })
                })
            })
        });
        describe("invalid note",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myNote = require("activityObjects.js").Note.spawn(
                    {
                         item:{}
                        ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"});
                }).toThrow({name : "Invalid Note exception", error:"Note needs a content an a permalink"});
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
                     item:{content:"content",permalink:"permalink"}
                    ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                    ,feed:"http://monfeed.com"});
            });
            it("should be properly initialised",function(){
                expect(myStatus.item.content).toEqual("content");
                expect(myStatus.item.permalink).toEqual("permalink");
                expect(myStatus.item.type).toEqual("http://activitystrea.ms/schema/1.0/status");
            });
            describe("renderItem",function(){
                beforeEach(function(){
                    spyOn(render,"renderTemplate");
                    myStatus.renderItem(callback)
                });
                it("should have call renderTemplate",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                    expect(render.renderTemplate.mostRecentCall.args[1]).toEqual({ status: myStatus.item })
                })
            })
        });
        describe("invalid status",function(){
            it("should throw an exception",function(){
                expect(function(){
                    myStatus = require("activityObjects.js").Status.spawn(
                    {
                         item:{}
                        ,user:{id:"bob42",name:"Robert Paulson",avatarURL:"http://myavatar.com"}
                        ,feed:"http://monfeed.com"});
                }).toThrow({name : "Invalid Status exception", error:"Status needs a content an a permalink"});
            })
        })
    })
});

// This is the previous unit tests for Article rendering.
// The code has been super modified, but the test still pass because I am awesome.
// I left the test here for all to see.
describe("class Article (old tests)",function(){
    describe("valid article",function(){
        beforeEach(function(){
            myArticle = require("activityObjects.js").Article.spawn(
            {item:{title:"titre",summary:"summary",content:"content",permalink:"permalink",url:"url"},user:{id:"bob",name:"Robert",avatarURL:"Girafe"},feed:"http://monfeed.com"});
        });
        it("should be properly initialised",function(){
            expect(myArticle.item.title).toEqual("titre");
            expect(myArticle.item.summary).toEqual("summary");
            expect(myArticle.item.content).toEqual("content");
            expect(myArticle.item.permalink).toEqual("permalink");
            expect(myArticle.item.type).toEqual("http://activitystrea.ms/schema/1.0/article");
        });
        describe("rendering article for post",function(){
            beforeEach(function(){
                render = require("render.js").Render;
                spyOn(render,"renderTemplate");
                myArticle.renderPost(mock_cb);
                first_cb = render.renderTemplate.mostRecentCall.args[2];
            });
            it("should have render the template for Article",function(){
                expect(render.renderTemplate).toHaveBeenCalled();
            });
            describe("callback after first rendering",function(){
                beforeEach(function(){
                    first_cb("","<fake xml />");
                    second_cb = render.renderTemplate.mostRecentCall.args[2];
                });
                it("should have render the template for Base",function(){
                    expect(render.renderTemplate).toHaveBeenCalled();
                });
                describe("callback after second rendering ",function(){
                    beforeEach(function(){
                        second_cb("<fake xml />");
                    });
                    it("should call the final callback",function(){
                        expect(mock_cb).toHaveBeenCalled();
                    })
                })
            })
        });
    })
});