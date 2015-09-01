/**
 * Templating Micro-library
 *
 * Usage Examples
 *
 *
 * Compile a template
 *
 * ```javascript
 * Template.compileTemplate(objectContainingUncompiledHTML);
 * ```
 *
 */
'use strict';

(function () {

    var Template = window.Template = new Core();

    function htmlDecode (value) {
        // Commented out because treating templates as HTML causes the browser to "fix" invalid
        // text nodes (our templating). This case still is not optimal, since we now have no solution for
        // embedding code examples, which utilize html entities.
        // return $('<div/>').html(value).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        value = value.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        // As a hack, here we could turn everything inside <pre> back into text nodes,
        // but I don't think we want to do that just yet.

        return value;
    }

    Template.registerGlobal('templates', {});


    /**
     * Concise template compilation
     *
     * An alternative implementation relying on lodash
     */
    Template.registerGlobal('compileTemplate', function (html, options) {
        html = htmlDecode(html);
        return _.template(html, window, options);
    });

    /**
     * Concise template compilation
     *
     * Loosely based on the lodash implementation
     */
    Template.registerGlobal('compileTemplateWithoutLodash', function (html, options) {

        html = htmlDecode(html);

        var regularExpression = /<%([^%>]+)?%>/g;
        var codeMatch = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var code = 'var r=[];\n';
        var cursor = 0;
        var match;

        function add (line, js) {
            js ? (code += line.match(codeMatch) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }

        while (match = regularExpression.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';

        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    });


    /**
     * Register a route for each template by default
     */
    $('template[data-pathname]').each(function () {
        //var template = this.content; // Should work with proper implementation of component syntax, but it doesn't. :(
        var template = $(this).html();
        var name = $(this).attr('data-pathname');

        Template.templates[name] = template;

        Router.registerRoute(name, {
            loadRoute: function () {
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                $outlet.html(Template.compileTemplate(App.templates[name]));
            },
            unloadRoute: function () {
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                $outlet.html('');
            }
        });
    });

})();