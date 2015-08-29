/**
 * A simple library for data-binding based on Object.observe()
 */

(function () {

    var Binding = window.Binding = new Core();

    Binding.registerGlobal('bindings', {});

    Binding.registerGlobal('bind', function (name, func) {
        Binding.bindings[name] = func;
    });

    $(document).ready(function () {
        Object.observe(Binding.data, function (changes) {
            changes.forEach(function (change) {
                var name = change.name;
                // var object = change.object;
                var newValue = change.object[name];

                var boundFunction = App.bindings[name] || null;

                if (boundFunction && typeof(boundFunction) === "function") return boundFunction(newValue);
            });
        });
    });

    /**
     * Example
     */
    //App.bind('previousRouteUnloadFunction', function (newValue) {
    //    console.log(newValue);
    //});

})();