#!/usr/bin/env node

var Y = require('./init'),
    path = require('path');

Y.log('Starting the MDL Suite@' + Y.packageInfo.version +
        ' using YUI@' + Y.version +
        ' with NodeJS@' + process.versions.node,
        'info', 'mdl');

options = Y.Project.init();

Y.log('Preparing MDL with the following options:', 'debug', 'mdl');
Y.log(options, 'debug', 'mdl');
(new Y.MDL(options)).run();
