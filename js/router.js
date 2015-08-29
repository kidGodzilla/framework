/**
 * A Javascript Router based on the HTML5 history API
 */

(function () {

    var Router = window.Router = new Core();

    Router.registerGlobal('routes', {});


    /**
     * Register a Route
     */
    Router.registerGlobal('registerRoute', function (routeName, options) {
        var routeParts = routeName.split('/');

        // Early return if our routeName is FUBAR
        if (!routeParts || !Array.isArray(routeParts)) return false;

        // Filter out the good parts
        routeParts = routeParts.filter(function (n) { return n != undefined && n !== "" });

        // Create an object path to routeParts
        return Utils.deepSetValue('Router.routes', routeParts, options);
    });



    /**
     * Route to a Named Route
     */
    Router.registerGlobal('routeTo', function (path, preserveState) {

        if (!preserveState) window.history.pushState({ pageTitle: document.title }, document.title, '#'+path);

        // Translate nullstring -> "index" route
        if (path === "") path = "index";

        var routeParts = path.split('/');

        // Early return if our path is FUBAR
        if (!routeParts || !Array.isArray(routeParts)) return false;

        // Filter out the good parts
        routeParts = routeParts.filter(function (n) { return n != undefined && n !== "" });

        var deepest = Utils.returnDeepest(this.routes, routeParts);

        var loadRoute = deepest.loadRoute || null;
        var unloadRoute = deepest.unloadRoute || null;
        var params = deepest.params || null;

        var previousRouteUnloadFunction = Router.get('previousRouteUnloadFunction');

        if (previousRouteUnloadFunction && typeof(previousRouteUnloadFunction === "function")) previousRouteUnloadFunction();
        if (loadRoute && typeof(loadRoute === "function")) loadRoute(params);
        Router.set('previousRouteUnloadFunction', unloadRoute);
    });


    /**
     * Go Back
     */
    Router.registerGlobal('goBack', function () {
        window.history.back();
    });

    /**
     * Go Forward
     */
    Router.registerGlobal('goForward', function () {
        window.history.go(1);
    });


    Router.registerGlobal('routeToCurrentHash', function (preserveState) {
        var currentRoute = window.location.hash;
        if (currentRoute.indexOf('#') === 0) currentRoute = currentRoute.slice(1);
        Router.routeTo(currentRoute, preserveState);
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
                return Router.routeTo(routeName);
            }
        });

        // React to forward / back button events
        $(window).on("popstate", function(event) {

            if (event.originalEvent.state !== null) {
                event.preventDefault();
                // Reference: var pageTitle = event.originalEvent.state.pageTitle;
                // Reference: var routeName = event.originalEvent.state.routeName;

                // Load the current route (from URL)
                Router.routeToCurrentHash(true);
            }
        });

        // Load the initial route (from URL)
        Router.routeToCurrentHash();

    });

})();