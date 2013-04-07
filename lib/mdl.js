var fs = require("fs"),
    path = require("path"),
    spawn = require('child_process').spawn;

YUI.add('mdl', function(Y) {
    Y.namespace('MDL');

    Y.MDL.options = {};

    Y.MDL = function(config){
        // Handle default configuration stuff here.
        this.options = config;
    };

    Y.MDL.prototype = {
        run: function() {
            var submodule;
            this.starttime = new Date().getTime();

            var child,
                args = this.options.other,
                submdl;

            submdl = path.dirname(path.dirname(process.mainModule.filename)) +
                    '/node_modules/' +
                    'mdl-' + this.options.branch +
                    '/lib/cli.js';

            args.unshift(submdl);
            child = spawn(process.execPath, args, {
                cwd: process.cwd(),
                stdio: [process.stdin, process.stdout, process.stderr]
            });
        }
    };
});
