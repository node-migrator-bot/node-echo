YAHOO.env.classMap = {"Comment": "utils", "Status": "utils", "KvsAPI": "utils", "ItemsAPICore": "utils", "TBind": "utils", "FeedsAPI": "utils", "Note": "utils", "UsersAPI": "utils", "ActivityObject": "utils", "Article": "utils", "ItemsAPI": "utils"};

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
