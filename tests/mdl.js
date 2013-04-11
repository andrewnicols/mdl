var YUITest = require('yuitest'),
    Assert = YUITest.Assert,
    ArrayAssert = YUITest.ArrayAssert,
    path = require('path'),
    Y = require(path.join(__dirname, '../', 'lib', 'init'));

var suite = new YUITest.TestSuite('MDL test suite');
suite.add(new YUITest.TestCase({
    name: 'run',
    _should: {
    },
    'test: child executes': function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var options,
            child,
            test = this;

        options = Y.Project.init([
            '--forcebranch',
            'master'
        ]);
        child = (new Y.MDL(options)).run();
        child.on('exit', function(code) {
            Assert.isTrue(true);
            test.resume();
        });

        this.wait();
    },
    test_help: function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var options,
            child,
            test = this,
            help_show = Y.help.show;

        Y.help.show = function() {
            Y.help.show = help_show;
            Assert.isTrue(true, 'Help was not called correctly');
        };

        options = Y.Project.init([
            '--forcebranch',
            'master',
            '--help'
        ]);
        child = (new Y.MDL(options)).run();
        child.on('exit', function(code) {
            Assert.isTrue(true);
            test.resume();
        });

        this.wait();
    }
}));

YUITest.TestRunner.add(suite);
