/**
 * Our "Framework" Application
 */
var App = new Core();

(function () {
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
})();