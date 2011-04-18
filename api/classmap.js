YAHOO.env.classMap = {"Comment": "echo", "Status": "echo", "req": "echo", "KvsAPI": "echo", "ItemsAPICore": "echo", "TBind": "echo", "FeedsAPI": "echo", "Note": "echo", "UsersAPI": "echo", "ActivityObject": "echo", "Article": "echo", "ItemsAPI": "echo"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};