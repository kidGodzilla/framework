/****************************************************
 * Router.js
 ***************************************************/
(function () {

    App.registerGlobal('routes', {});


    /**
     * Register a Route
     */
    App.registerGlobal('registerRoute', function (routeName, options) {
        var routeParts = routeName.split('/');

        // Early return if our routeName is FUBAR
        if (!routeParts || !Array.isArray(routeParts)) return false;

        // Filter out the good parts
        routeParts = routeParts.filter(function (n) { return n != undefined && n !== "" });

        // Create an object path to routeParts
        return this.deepSetValue('App.routes', routeParts, options);
    });



    /**
     * Route to
     */
    App.registerGlobal('routeTo', function (path, preserveState) {

        if (!preserveState) window.history.pushState({ pageTitle: document.title }, document.title, '#'+path);

        // Translate nullstring -> "index" route
        if (path === "") path = "index";

        var routeParts = path.split('/');

        // Early return if our path is FUBAR
        if (!routeParts || !Array.isArray(routeParts)) return false;

        // Filter out the good parts
        routeParts = routeParts.filter(function (n) { return n != undefined && n !== "" });

        var deepest = this.returnDeepest(this.routes, routeParts);

        var loadRoute = deepest.loadRoute || null;
        var unloadRoute = deepest.unloadRoute || null;
        var params = deepest.params || null;

        var previousRouteUnloadFunction = App.get('previousRouteUnloadFunction');

        if (previousRouteUnloadFunction && typeof(previousRouteUnloadFunction === "function")) previousRouteUnloadFunction();
        if (loadRoute && typeof(loadRoute === "function")) loadRoute(params);
        App.set('previousRouteUnloadFunction', unloadRoute);
    });


    /**
     * Go Back
     */
    App.registerGlobal('goBack', function () {
        window.history.back();
    });

    /**
     * Go Forward
     */
    App.registerGlobal('goForward', function () {
        window.history.go(1);
    });


    App.registerGlobal('routeToCurrentHash', function (preserveState) {
        var currentRoute = window.location.hash;
        if (currentRoute.indexOf('#') === 0) currentRoute = currentRoute.slice(1);
        App.routeTo(currentRoute, preserveState);
    });


    /**
     * Begin listening for navigation events after DOMContentLoaded / document.onreadystatechange
     */
    $(document).ready(function () {

        // React to [href] click events via event delegation
        $("body").on("click", "[href]", function (event) {

            var routeName = $(this).attr("href");

            if (routeName.indexOf('#') === 0) {

                event.preventDefault();
                routeName = routeName.slice(1);
                return App.routeTo(routeName);
            }
        });

        // React to forward / back button events
        $(window).on("popstate", function(event) {

            if (event.originalEvent.state !== null) {
                event.preventDefault();
                // Reference: var pageTitle = event.originalEvent.state.pageTitle;
                // Reference: var routeName = event.originalEvent.state.routeName;

                // Load the current route (from URL)
                App.routeToCurrentHash(true);
            }
        });

        // Load the initial route (from URL)
        App.routeToCurrentHash();

    });

})();