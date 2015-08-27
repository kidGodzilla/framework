(function () {
    /**
     * Safely return a deeply-nested object which may or may not exist at any depth
     *
     *  An Example
     *
     * ```
     * var foo = App.deepReturnSafely(window, ['foo', 'bar', 'baz', 'quack', 'moo']);
     * if (foo) // Do things. Terrible things. But, more safely;
     * ```
     */
    App.registerGlobal('deepReturnSafely', function (obj, properties, defaultReturnValue) {

        // Early return if we cannot proceed
        if (obj === undefined || obj === null)
            return defaultReturnValue || false;

        // Early return if we reach our destination
        if (properties.length === 0)
            return obj;

        // Recurse with the next property in the properties array
        return this.deepReturnSafely(obj[properties[0]], properties.slice(1), defaultReturnValue);
    });

    /**
     * "Safely" set a deeply-nested value which may or may not exist at any depth
     *
     *  An Example (sets window.foo.bar.baz.quack.moo = "cow", although none of these objects exist
     *
     * ```
     * var foo = App.deepSetValue(window, ['foo', 'bar', 'baz', 'quack', 'moo'], "cow");
     * ```
     */
    App.registerGlobal('deepSetValue', function (objName, properties, value) {

        var str = objName;

        if (properties.length === 0) throw "You must pass at least one property to deepSetValue";

        properties.forEach(function (val) {
            str += "." + val;
            var test = eval(str);
            if (!test) eval(str + " = {}");
        });

        return eval(str + " = $.extend({}, " + str + ", value)");
    });

    /**
     * Return deepest nested object property & return leftover properties as params
     */
    App.registerGlobal('returnDeepest', function (obj, properties) {

        if (properties.length === 0 || !obj[properties[0]]) {
            if (properties.length > 0) obj.params = properties;
            return obj;
        }

        return this.returnDeepest(obj[properties[0]], properties.slice(1));
    });

})();