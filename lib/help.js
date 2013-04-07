YUI.add('help', function(Y) {
    /**
    * @module mdl
    * @class Help
    */
    var help = [
        "Some help",
        "Some more help"
    ].join('\n'),

    NS = Y.namespace('MDL.help');

    NS.render = function() {
        return Y.Lang.sub(help, {
            VERSION: Y.packageInfo.version
        });
    };

    NS.show = function() {
        // Display help
        console.error(this.render(), 'error');

        // Exit nicely.
        process.exit(0);
    };

});
