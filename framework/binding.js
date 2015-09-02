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

    Binding.registerGlobal('bindings', {});

    Binding.registerGlobal('bind', function (valueName, func) {
        Binding.bindings[valueName] = func;

        $(document).ready(function () {
            var obj = App.data[valueName];

            // Either watch the parent or App.data if the bound value is invalid
            if (!App.data[valueName] || typeof(App.data[valueName]) !== "object") obj = App.data;
            Object.observe(obj, function (changes) {
                changes.forEach(function (change) {
                    var name = change.name;
                    // var obj = change.object;
                    // var newValue = change.object[name];
                    // var boundFunction = Binding.bindings[name] || null;

                    var result = App.data[valueName]; // Return the value we actually wanted, not it's parent object

                    if (func && typeof(func) === "function") return func(result);
                });
            });
        });
    });

})();