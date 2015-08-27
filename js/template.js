/**
 * Templating Micro-library
 */
var Template = new Core();

(function () {

    function htmlDecode (value) {
        var result = $('<div/>').html(value).html();
        result = result.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        return result;
    }

    Template.registerGlobal('templates', {});

    /**
     * Concise template compilation
     */
    Template.registerGlobal('compileTemplate', function (html, options) {

        html = htmlDecode(html);
        console.log(html);

        var re = /<%([^%>]+)?%>/g;
        var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var code = 'var r=[];\n';
        var cursor = 0;
        var match;

        var add = function (line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        };

        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }

        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';

        return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
    });

    // By default, Register a route for each template
    $('template[data-pathname]').each(function () {
        //var template = this.content; // Should work, but it doesn't. :(
        var template = $(this).html();
        var name = $(this).attr('data-pathname');

        Template.templates[name] = template;

        Router.registerRoute(name, {
            loadRoute: function () {
                var thisTemplate = App.templates[name];
                console.log(thisTemplate);
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                var compiled = Template.compileTemplate(thisTemplate);
                console.log(compiled);
                $outlet.html(compiled);
            },
            unloadRoute: function () {
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                $outlet.html('');
            }
        });
    });

})();