var YUITest = require('yuitest'),
    Assert = YUITest.Assert,
    ArrayAssert = YUITest.ArrayAssert,
    path = require('path'),
    Y = require(path.join(__dirname, '../', 'lib', 'init'));

var suite = new YUITest.TestSuite('MDL test suite');
suite.add(new YUITest.TestCase({
    name: 'Base Options',
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
    }
}));

YUITest.TestRunner.add(suite);
