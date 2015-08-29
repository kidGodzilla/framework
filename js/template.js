/**
 * Templating Micro-library
 */
var Template = new Core();

(function () {

    function htmlDecode (value) {
        // return $('<div/>').html(value).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'); // Should be safer but causes problems evaluating certian expressions
        return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }

    Template.registerGlobal('templates', {});

    /**
     * Concise template compilation
     *
     * Loosely based on the lodash implementation
     */
    Template.registerGlobal('compileTemplate', function (html, options) {

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

    // By default, Register a route for each template
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