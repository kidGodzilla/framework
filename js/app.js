/**
 * Our "Framework" Application
 */

(function () {

    var App = window.App = new Core();

    App.registerGlobal('updateBoundData', function () {
        var val = $('#input2').val();
        Binding.set('input', val);
    });

    Binding.bind('input', function (newValue) {
        $('#foo').html(newValue);
    });

    App.set('templatePageTitle', 'Advanced Template Demo');
    App.set('items', {
        a: "foo",
        b: "bar",
        c: "baz"
    });

    App.registerGlobal('updateGravatar', function() {
        var email = $('#input3').val();

        var gravatar = 'http://www.gravatar.com/avatar/' + Utils.md5(email) + '?s=200';
        $('#gravatar').attr('src', gravatar);
    });

    $.get('https://api.github.com/repos/kidGodzilla/framework/events', function (data) {
        App.set('githubData', data);
        // console.log(data); // data[1].actor.login, data[1].type, data[1].created_at
    });
})();