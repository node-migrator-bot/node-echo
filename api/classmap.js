YAHOO.env.classMap = {"Comment": "echo", "Status": "echo", "req": "echo", "Const": "echo", "ItemsAPICore": "echo", "TBind": "echo", "utils": "echo", "KvsAPI": "echo", "FeedsAPI": "echo", "Note": "echo", "UsersAPI": "echo", "Flag": "echo", "Tag": "echo", "ActivityObject": "echo", "Article": "echo", "ItemsAPI": "echo", "Like": "echo"};

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
