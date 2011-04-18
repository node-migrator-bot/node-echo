YAHOO.env.classMap = {"KvsAPI": "itemsAPI", "ItemsAPICore": "itemsAPI", "render": "itemsAPI", "FeedsAPI": "itemsAPI", "UsersAPI": "itemsAPI", "ActivityObject": "itemsAPI", "TBind": "utils", "ItemsAPI": "itemsAPI"};

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
