/**
 * Convert Items and Activity Objects into proper XML Activity Streams
 * http://activitystrea.ms/schema/1.0/activity-schema-01.html
 */

var fs = require('fs');

exports.Render = (function(){

    var my = {};

    my.templateCache = {};
    my.cache = {};

    my.renderTemplate = function(filename, data, callback){
        /**
         * Generate proper XML Activity Streams from data and a template
         * @method renderTemplate
         * @param {file} filename file containing the XML template
         * @param {Object} data Data to render (format depend on the template)
         * @param {function} callback function to call after rendering
         */
        if(my.templateCache[filename]){
            callback(null,my.render(my.templateCache[filename],data));
        }
        else {
            fs.readFile(filename,'utf8',my.getFileCallback(filename,data,callback));
        }
    }

    my.getFileCallback = function (filename,templateData,callback){
        /**
         * Load template into cache
         * @private
         */

        return function(error,data){
            if(error)callback(error);
            else{
                my.templateCache[filename] = data;
                var rendered = my.render(my.templateCache[filename],templateData);
                callback(null,rendered);
            }
        }
    }
    var render = function tmpl(str, data){
        /**
         * Generate the rendering function
         * @private
         */
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
                my.cache[str] = my.cache[str] ||
                        tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
                new Function("obj",
                        "var p=[],print=function(){p.push.apply(p,arguments);};" +

                            // Introduce the data as local variables using with(){}
                                "with(obj){p.push('" +

                            // Convert the template into pure JavaScript

                                str
                                        .replace(/[\r\t\n]/g, " ")
                                        .split("<%").join("\t")
                                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                                        .replace(/\t=(.*?)%>/g, "',$1,'")
                                        .split("\t").join("');")
                                        .split("%>").join("p.push('")
                                        .split("\r").join("\\'")
                                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

    my.render = render;

    return my;
})();

