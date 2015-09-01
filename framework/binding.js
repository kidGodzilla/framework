/**
 * A simple library for data-binding based on Object.observe()
 *
 * Usage Examples
 *
 *
 * Opt-into one-way data binding in your app (for your instance of Core)
 *
 * ```javascript
 * Binding.watchObject(App);
 * ```
 *
 * Bind a function to a change event on App.data.previousRouteUnloadFunction
 *
 * ```javascript
 * App.bind('previousRouteUnloadFunction', function (newValue) {
         console.log(newValue);
       });
 * ```
 *
 */
'use strict';

(function () {

    var Binding = window.Binding = new Core();

    Binding.registerGlobal('bind', function (name, func) {
        Binding.bindings[name] = func;
    });


    /**
     * Watch an object for changes
     */
    Binding.registerGlobal('watchObject', function (object) {
        object.registerGlobal('bindings', {});
        object.registerGlobal('bind', Binding.bind);

        $(document).ready(function () {
            Object.observe(object.data, function (changes) {
                changes.forEach(function (change) {
                    var name = change.name;
                    // var obj = change.object;
                    var newValue = change.object[name];

                    var boundFunction = App.bindings[name] || null;

                    if (boundFunction && typeof(boundFunction) === "function") return boundFunction(newValue);
                });
            });
        });
    });


    /**
     * Watch for changes on this object by default
     */
    Binding.watchObject(Binding);

})();