var YUITest = require('yuitest'),
    Assert = YUITest.Assert,
    ArrayAssert = YUITest.ArrayAssert,
    path = require('path'),
    Y = require(path.join(__dirname, '../', 'lib', 'init'));

var suite = new YUITest.TestSuite('help.js');
suite.add(new YUITest.TestCase({
    name: 'General',
    test_render: function() {
        var output = Y.help.render();
        Assert.isString(output);
    },
    test_show: function() {
        var _log = console.log;
        console.log = function(message) {
            console.log = _log;
            Assert.isString(message);
        };
        Y.help.show();
    }
}));

YUITest.TestRunner.add(suite);
