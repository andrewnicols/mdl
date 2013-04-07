YUI.add('options', function(Y) {
    var path = require('path');

    /**
     * Handles argument parsing
     * @module mdl
     * @class Options
     */

    /**
     * Parses arguments and returns an Object of config options
     * @method Options
     * @param {Array} args Arguments to parse
     * @return {Object} The config object
     */
    Y.Options = function(inputargs) {
        var args = Y.Array(inputargs),
            v = null,

            // Default values:
            options = {
                branch: null,
                debug: false,
                other: []
            };

        while (args.length > 0) {
            v = args.shift();
            // options.* defined in ./builder.js
            switch (v) {
                case '--forcebranch':
                    options.branch = args.shift() || 'master';
                    Y.log('Forcing branch to ' + options.branch, 'warn', 'mdl');
                    break;
                case "--debug":
                    Y.applyConfig({ debug: true, filter: 'debug' });
                    options.debug = true;
                    break;
                default:
                    options.other.push(v);
                    break;
            }
        }

        return options;
    };

});
