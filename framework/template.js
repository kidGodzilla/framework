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
     * Watch for changes to an object and re-render a template
     */
    Template.registerGlobal('watch', function () {

    });


    /**
     * Register a route for each template by default
     */
    $('template[data-pathname]').each(function () {
        // var template = this.content; // Should work with proper implementation of component syntax, but it doesn't. :(
        var template = $(this).html();
        var name = $(this).attr('data-pathname');

        Template.templates[name] = template;

        // If template[data-model], watch model for changes & "magically" re-render the template
        var model = $(this).attr('data-model');
        if (model) {
            $(document).ready(function () {
                App.bind(model, function () {
                    var currentRoute = Router.getCurrentRoute();
                    if (currentRoute === name) Router.routeTo('template');
                });

                // Iterate through each child-key and create bindings (if applicable)
                for (var key in App.data[model]) {
                    Binding.bind(model[key], function () {
                        var currentRoute = Router.getCurrentRoute();
                        if (currentRoute === name) Router.routeTo('template');
                    });
                }

            });
        }

        Template.registerGlobal('createInputBindings', function () {
            var $boundInputs = $('#outlet').find('[data-bindto]');
            if ($boundInputs.length) {
                // Bind each input with [data-bindto] to App.data[data-bindto] = $(this).val()
                $boundInputs.each(function () {
                    var bindTo = $(this).attr('data-bindto');
                    $(this).on('keyup paste change input', function () {
                        var $thisVal = $(this).val();
                        App.set(bindTo, $thisVal);
                    });
                });
            }
        });

        Router.registerRoute(name, {
            loadRoute: function () {
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                $outlet.html(Template.compileTemplate(App.templates[name]));
                Template.createInputBindings();
            },
            unloadRoute: function () {
                var $outlet = $('#outlet').length ? $('#outlet').first() : $('body');
                $outlet.html('');
            }
        });
    });

})();