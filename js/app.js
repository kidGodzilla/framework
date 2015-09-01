/**
 * Our "Framework" Example Application
 */
'use strict';

(function () {

    var App = window.App = new Core();

    /**
     * Opt into one-way binding on this object's datastore
     */
    Binding.watchObject(App);


    /**********************************************************************************
     * Simple data-binding demo (because all of the other frameworks are doing it)
     **********************************************************************************/

    App.registerGlobal('updateBoundData', function () {
        var val = $('#input2').val();
        App.set('input', val);
    });

    App.bind('input', function (newValue) {
        $('#foo').html(newValue);
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


    /**********************************************************************************
     * Gravatar example
     **********************************************************************************/

    App.registerGlobal('updateGravatar', function () {
        var email = $('#input3').val();

        var gravatar = 'http://www.gravatar.com/avatar/' + Utils.md5(email) + '?s=200';
        $('#gravatar').attr('src', gravatar);
    });

    $.get('https://api.github.com/repos/kidGodzilla/framework/events', function (data) {
        App.set('githubData', data);
        // console.log(data); // data[1].actor.login, data[1].type, data[1].created_at
    });


    /**********************************************************************************
     * Autosuggest example
     **********************************************************************************/



})();