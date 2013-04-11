var YUITest = require('yuitest'),
    Assert = YUITest.Assert,
    ArrayAssert = YUITest.ArrayAssert,
    path = require('path'),
    Y = require(path.join(__dirname, '../', 'lib', 'init'));

var suite = new YUITest.TestSuite('Project test suite');
suite.add(new YUITest.TestCase({
    name: 'init',
    _should: {
        error: {
            test_nomdeploy: true
        }
    },
    test_nobranchsupplied: function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var options = Y.Project.init();
        Assert.areEqual('2.5', options.branch);
    },
    test_nomdeploy: function() {
        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'nomdeploy'));
        var options,
            _exit = process.exit;

        process.exit = function(code) {
            process.exit = _exit;
        };

        options = Y.Project.init();
    }
}));

suite.add(new YUITest.TestCase({
    name: 'getVersion',
    _should: {
        error: {
            test_nomdeploy: true
        }
    },
    test_valid: function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var result = Y.Project.getVersion();
        Assert.isString(result, 'Invalid version number type');
        Assert.areEqual('2.5', result, 'An invalid moodle version was returned');
    },
    test_nomdeploy: function() {
        var result,
            self = this,
            _exit = process.exit;

        process.exit = function(code) {
            process.exit = _exit;
            self.callback(null, {
                code: code
            });
        };

        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'nomdeploy'));
        result = Y.Project.getVersion();
    },
    test_noreleasestring: function() {
        var result;

        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'norelease'));
        result = Y.Project.getVersion();
        Assert.isFalse(result);
    },
    test_master: function() {
        var result;

        process.chdir(path.join(__dirname, 'testdata', 'moodle_master'));
        result = Y.Project.getVersion();
        Assert.isString(result);
        Assert.areEqual('master', result);
    }
}));

suite.add(new YUITest.TestCase({
    name: 'getRootDirectory',
    test_valid: function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var result = Y.Project.getRootDirectory();
        Assert.isString(result, 'Invalid Root directory');
    },
    test_nomdeploy: function() {
        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'nomdeploy'));
        var result = Y.Project.getRootDirectory();
        Assert.isUndefined(result, 'A root directory was returned for an invalid moodle directory');
    }
}));

suite.add(new YUITest.TestCase({
    name: 'isValid',
    test_valid: function() {
        process.chdir(path.join(__dirname, 'testdata', 'moodle_25'));
        var result = Y.Project.isValid();
        Assert.isTrue(result);
    },
    test_nomdeploy: function() {
        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'nomdeploy'));
        var result = Y.Project.isValid();
        Assert.isFalse(result);
    },
    test_nomoodlelib: function() {
        process.chdir(path.join(__dirname, 'testdata', 'invalid', 'nomoodlelib'));
        var result = Y.Project.isValid();
        Assert.isFalse(result);
    }
}));

YUITest.TestRunner.add(suite);
