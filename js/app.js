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
})();