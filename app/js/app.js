/**
 * Our "Framework" Example Application
 */
'use strict';

(function () {

    var App = window.App = new Core();

    /**********************************************************************************
     * Simple data-binding demo (because all of the other frameworks are doing it)
     **********************************************************************************/

    App.bind('input', function (newValue) {
        $('#outlet #outputBox').html(newValue);
    });


    /**********************************************************************************
     * Advanced (data-backed) template example
     **********************************************************************************/

    App.set('templatePageTitle', 'Advanced Template Demo');
    App.set('items', {
        a: "foo",
        b: "bar",
        c: "baz"
    });

    App.registerGlobal('addItem', function () {
        var newKey = (Math.random()*0xFFFFFF<<0).toString(16);
        App.data.items[newKey] = $('input[name=newItem]').val();
    });


    /**********************************************************************************
     * Gravatar example
     **********************************************************************************/

    App.bind('gravatarEmail', function (email) {
        var gravatar = 'http://www.gravatar.com/avatar/' + Utils.md5(email) + '?s=200';
        $('#gravatar').attr('src', gravatar);
    });


    /**********************************************************************************
     * Data-backing example
     **********************************************************************************/

    $.get('https://api.github.com/repos/kidGodzilla/framework/events', function (data) {
        App.set('githubData', data);
    });


    /**********************************************************************************
     * Loads external resources via AJAX
     **********************************************************************************/
    Utils.HTMLIncludes();




})();