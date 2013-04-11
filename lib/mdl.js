var path    = require("path"),
    fs      = require('fs'),
    spawn   = require('child_process').spawn;

YUI.add('mdl', function(Y) {
    Y.MDL = {
        options: {}
    };

    Y.MDL = function(config){
        // Handle default configuration stuff here.
        this.options = config;
    };

    Y.MDL.prototype = {
        run: function() {
            this.starttime = new Date().getTime();
            var options = this.options;

            if (options.help) {
                Y.help.show();
            }

            // Run the version of mdl specific to this branch.
            var child,
                args = this.options.other,
                submdl,
                submdlstat;

            submdl = path.resolve(this.getSubPath(this.options.branch));

            if (!fs.existsSync(submdl)) {
                Y.log('Unable to find version ' + this.options.branch +' of the mdl tools - falling back to master', 'warn', 'mdl');
                submdl = this.getSubPath('master');
            }

            submdl = submdl + '/lib/cli.js';
            submdlstat = fs.lstatSync(submdl);

            if (!submdlstat.isFile()) {
                Y.log('Unable to find appropriate mdl sub version', 'error', 'mdl');
                process.exit(255);
            }

            args.unshift(submdl);
            child = spawn(process.execPath, args, {
                cwd: process.cwd(),
                stdio: [process.stdin, process.stdout, process.stderr]
            });

            child.on('exit', function(code) {
                Y.log("Completed with exit code " + code);
            });
            return child;
        },
        getSubPath: function(version) {
            return path.dirname(path.dirname(__filename)) +
                    '/node_modules/' +
                    'mdl-' + version;
        }
    };
});
