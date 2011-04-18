YAHOO.env.classMap = {"Status\nconstructor\nextends ActivityObject": "utils", "KvsAPI": "utils", "ItemsAPICore": "utils", "Comment\nconstructor\nextends ActivityObject": "utils", "Note\nextends ActivityObject\nconstructor": "utils", "FeedsAPI": "utils", "UsersAPI": "utils", "ActivityObject": "utils", "TBind": "utils", "Article\nconstructor\nextends ActivityObject": "utils", "ItemsAPI": "utils"};

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
