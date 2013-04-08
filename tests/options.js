var YUITest = require('yuitest'),
    Assert = YUITest.Assert,
    ArrayAssert = YUITest.ArrayAssert,
    path = require('path'),
    Y = require(path.join(__dirname, '../', 'lib', 'init'));

var suite = new YUITest.TestSuite('Options test suite');
suite.add(new YUITest.TestCase({
    name: 'Base Options',
    'test: --forcebranch - master': function() {
        var somebranch = 'other',
            options = Y.Options([
            '--forcebranch',
            somebranch
        ]);

        Assert.areSame(somebranch, options.branch, 'Failed to set a forced branch to master');
    },

    'test: --forcebranch - default': function() {
        var somebranch = 'master',
            options = Y.Options([
            '--forcebranch'
        ]);

        Assert.areSame(somebranch, options.branch, 'Failed to set the default forcedbranch');
    },

    'test: --forcebranch - other': function() {
        var somebranch = 'other',
            options = Y.Options([
            '--forcebranch',
            somebranch
        ]);

        Assert.areSame(somebranch, options.branch, 'Failed to set a forced branch to other');
    },

    'test: debug': function() {
        // --debug forces Y.config.debug but it may already be set
        Assert.areEqual('raw', Y.config.filter);

        var options = Y.Options([
            '--debug'
        ]);

        Assert.isTrue(options.debug);
        Assert.isTrue(Y.config.debug);
        Assert.areEqual('debug', Y.config.filter);
    },

    'test: help': function() {
        var options;

        options = Y.Options([
            '-h'
        ]);
        Assert.isTrue(options.help, 'Failed to set help correctly with -h option');
        ArrayAssert.contains('-h', options.other, 'Failed to pass -h options into options.other');

        options = Y.Options([
            '--help'
        ]);
        Assert.isTrue(options.help, 'Failed to set help correctly with --help option');
        ArrayAssert.contains('--help', options.other, 'Failed to pass --help options into options.other');

    },
    'test: remaining options': function() {
        var options,
            params = [];

        // With empty params initially.
        options = Y.Options(params);
        ArrayAssert.isEmpty(options.other, 'Some other options were set');

        // With one non-hyphenated option.
        params = [
            'test'
        ];
        options = Y.Options(params);
        ArrayAssert.contains('test', options.other,
                'Failed to pass non-hyphenated option into options.other');

        // With one option which starts with a hyphen (-).
        params = [
            '-q'
        ];
        options = Y.Options(params);
        ArrayAssert.contains('-q', options.other,
                'Failed to pass single hyphenated option into options.other');

        // With one option which starts with a double hyphen (--).
        params = [
            '--test'
        ];
        options = Y.Options(params);
        ArrayAssert.contains('--test', options.other,
                'Failed to pass double hyphenated option into options.other');

        // Multiple options.
        params = [
            'test',
            '--test',
            '-q'
        ];
        options = Y.Options(params);
        Assert.areEqual(3, options.other.length);
    }
}));

YUITest.TestRunner.add(suite);
