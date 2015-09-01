/**
 *
 */
'use strict';

(function () {
    var Components = window.Components = new Core();

    Components.registerGlobal('_components', {});

    Components.registerGlobal('registerComponent', function (name, options) {
        Components[name] = options;
        xtag.register(name, options);
    });

    Components.registerGlobal('addMethod', function (componentName, methodName, func) {
        var thisComponent = Components._components[componentName];

        if (!thisComponent.methods) thisComponent.methods = {};

        if (thisComponent.methods[methodName] === undefined)
            thisComponent.methods[methodName] = func;

        Components.registerComponent(componentName, thisComponent);
    });



})();